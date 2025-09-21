import requests
import xml.etree.ElementTree as ET

# Konfigurasi
HOST = "masputrawae.github.io"
KEY = "72edac56b02b49048b9b1b3a2b015eb7"
KEY_LOCATION = f"https://{HOST}/{KEY}.txt"
SITEMAP_URL = "./public/sitemap.xml"

def get_urls_from_sitemap(file_path):
    # Baca file XML lokal
    tree = ET.parse(file_path)
    root = tree.getroot()
    ns = {"ns": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    return [loc.text for loc in root.findall(".//ns:loc", ns)]

def submit_to_indexnow(urls):
    payload = {
        "host": HOST,
        "key": KEY,
        "keyLocation": KEY_LOCATION,
        "urlList": urls
    }
    resp = requests.post(
        "https://api.indexnow.org/IndexNow",
        json=payload,
        headers={"Content-Type": "application/json; charset=utf-8"}
    )
    print("Status:", resp.status_code)
    print("Response:", resp.text)

if __name__ == "__main__":
    urls = get_urls_from_sitemap(SITEMAP_URL)
    print(f"Found {len(urls)} URLs in sitemap")
    print(f"- {urls}")
    submit_to_indexnow(urls)

