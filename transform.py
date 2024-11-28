import requests
import re
from pathlib import Path
import os

api_token = os.getenv('API_TOKEN')
upload_url = os.getenv('UPLOAD_URL')

# 下载其他图床的图链
def download(image_url, save_dir='temp_images'):
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36',
            'Referer': 'https://www.google.com'
        }
        response = requests.get(image_url, headers=headers, stream=True)
        response.raise_for_status()
        
        # 确认本地路径确实存在
        Path(save_dir).mkdir(exist_ok=True)
        file_name = image_url.split('/')[-1]
        file_path = Path(save_dir) / file_name
        
        if response.status_code == 200:
            with open(file_path, 'wb') as f:
                for chunk in response.iter_content(1024):
                    f.write(chunk)
        return file_path
    
    except Exception as e:
        print(f'Failed to download {image_url}: {e}')
        return None

# 上传至国内简单图床
def upload(image_path):
    files = {'image': open(image_path, 'rb')}
    data = {'token': api_token}
    response = requests.post(upload_url, files=files, data=data)
    result = response.json()

    if result.get('result') == 'success':
        return result.get('url')
    else:
        print(f'Upload failed: {result.get("message")}')
        return None

# 从文档中获取图链
def process_pic(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 运用正则去筛选出其中的图片（返回列表类型）
    img_pattern = r"!\[.*?\]\((http[s]?://[^\s)]+)\)"
    matches = re.findall(img_pattern, content)

    for image_url in matches:
        # 跳过来自 pic.juniortree.com / img.juniortree.com / img.duckk.org的图链
        if 'pic.juniortree.com' in image_url or 'img.juniortree.com' in image_url or 'img.duckk.org' in image_url:
            print(f"Skipping image: {image_url}")
            continue

        print(f"Processing image: {image_url}")

        # 下载原始图片
        local_image = download(image_url)
        if local_image:
            # 上传到目标图床
            new_url = upload(local_image)
            if new_url:
                print(f'Replaced {image_url} with {new_url}')
                content = content.replace(image_url, new_url)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

def process_docs_directory(directory):
    """处理目录中的所有 Markdown 文件"""
    md_files = Path(directory).rglob("*.md")
    for md_file in md_files:
        print(f"Processing file: {md_file}")
        process_pic(md_file)

def delect_dir(path):
    if os.path.exists(path):
        for file in os.listdir(path):
            file_path = os.path.join(path, file)
            if os.path.isfile(file_path):
                os.remove(file_path)
            elif os.path.isdir(file_path):
                delect_dir(file_path)
        os.rmdir(path)

if __name__ == "__main__":
    docs_dir = 'docs'
    process_docs_directory(docs_dir)
    delect_dir('temp_images')