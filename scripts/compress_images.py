#!/usr/bin/env python3
"""Pre-compress all gallery images to static files for instant loading"""
import os, sys, hashlib, urllib.request
from PIL import Image
from io import BytesIO

OUTPUT_DIR = "/app/frontend/public/images"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# All image URLs from App.js
URLS = [
    # Hero
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/os7nbj1z_6X3A2979.jpg",
    # Welcome
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/ibmg8lib_6X3A3399.jpg",
    # Sea access
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/cgfs9a63_Main%20Photo%20Option.jpg",
    # Pool & Terraces
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/8qru9z8n_1st%20Shot%20of%20pool%20section.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/n74aj80a_5th%20shot.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/6ebta2y6_6X3A2685.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/6f8v5ybr_fouth%20shot.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/w03fxzmz_Second%20Main%20shot.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/8nlyu6xh_thrid%20shot.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/yk36ymws_6X3A2979.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/xwhow8qr_IMG_9420.jpeg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/uolthw34_6X3A2942.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/7wint7la_6X3A2761.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/x97o08jp_6X3A2840.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/ephbwhe6_6X3A2862.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/7h74aimj_6X3A2953.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/562pm7rb_6X3A2672.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/pqo4p0lj_6X3A2674.jpg",
    # Down to the Sea
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/zxso9kvv_main%20pho.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/2abm8h8n_6X3A3275.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/kqiim4cb_6X3A3316.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/m2btdjh4_6X3A3320.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/lww6rffa_DJI_20250831161029_0103_D%20copy.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/t5zwm95t_DJI_20250831161052_0106_D%20copy.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/ufbiwkrp_DJI_20250831161634_0138_D%20copy.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/9yxbz6wa_DJI_20250831161115_0108_D%20copy.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/ekwml0zh_aab6d5b1-6c6f-41ed-aeb5-19ab94c80446.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/rpq7r46m_9f532966-46f5-4775-8131-67650e7744ba.jpg",
    # Interior
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/06fdna31_Main%20Photo.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/x1fizolk_6X3A2420.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/wddyfkn7_6X3A2455.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/5zo75vz1_6X3A2461.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/573zw91d_6X3A2478.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/w28wcqxv_6X3A2517.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/d7xik4o3_6X3A2527.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/bj0h5wrc_6X3A2533.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/6to9rj0u_6X3A3038.jpg",
    # Outdoor Dining
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/4zpf91xn_Main%20Shot.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/vpf2fobt_6X3A2610.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/wqmyullr_6X3A2619.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/gr884u1k_6X3A2648.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/8xg5oe5c_6X3A2977.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/ums7pats_6X3A3007.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/tcnc460i_6X3A3010.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/vfnwo4c3_IMG_8792.jpeg",
    # Kitchen
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/xzgggwie_Main%20Shot.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/o1ppr2bg_6X3A3075.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/gitf0uu5_6X3A3076.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/1iieiy9h_6X3A3080.jpg",
    # Bedrooms (from IMAGES constants - these are the same domain)
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/tqbz7jdf_6X3A2388.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/k4zzwjhd_6X3A2379.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/v3g5z1qn_6X3A2393.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/i1uxpxbm_6X3A2404.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/p2s81jbx_6X3A2338.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/jcjhxeab_6X3A2330.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/7bpomgpb_6X3A2351.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/mvkz9uvn_6X3A2328.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/w16x7e3h_6X3A2305.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/0mjv4tkx_6X3A2287.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/kf8d7xq5_6X3A2295.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/njjp6dh3_6X3A2298.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/iypqibwb_6X3A2310.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/jq3q2ipo_6X3A2353.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/xpuaxxzb_6X3A2360.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/g9w0vqz7_6X3A2368.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/bfpynz8i_6X3A2371.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/2sifpg6h_6X3A2372.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/jh3y04ot_6X3A2375.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/ylvi6l68_6X3A3119.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/t3sge2be_6X3A3126.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/d5xlsvzk_6X3A3140.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/kkmlz4zp_6X3A3145.jpg",
    # Villa detail section images
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/os7nbj1z_6X3A2979.jpg",
    "https://customer-assets.emergentagent.com/job_cycladic-retreat/artifacts/k4zzwjhd_6X3A2379.jpg",
]

# Deduplicate
seen = set()
unique_urls = []
for u in URLS:
    if u not in seen:
        seen.add(u)
        unique_urls.append(u)

print(f"Processing {len(unique_urls)} unique images...")
mapping = {}

for i, url in enumerate(unique_urls):
    short_hash = hashlib.md5(url.encode()).hexdigest()[:10]
    outname = f"{short_hash}.jpg"
    outpath = os.path.join(OUTPUT_DIR, outname)
    
    if os.path.exists(outpath):
        size = os.path.getsize(outpath)
        mapping[url] = f"/images/{outname}"
        print(f"[{i+1}/{len(unique_urls)}] CACHED {outname} ({size//1024}KB)")
        continue
    
    try:
        data = urllib.request.urlopen(url, timeout=30).read()
        img = Image.open(BytesIO(data))
        if img.mode in ('RGBA', 'P'):
            img = img.convert('RGB')
        
        w, h = img.size
        max_w = 1400
        if w > max_w:
            ratio = max_w / w
            img = img.resize((max_w, int(h * ratio)), Image.LANCZOS)
        
        img.save(outpath, format='JPEG', quality=78, optimize=True)
        size = os.path.getsize(outpath)
        mapping[url] = f"/images/{outname}"
        print(f"[{i+1}/{len(unique_urls)}] {size//1024}KB <- {len(data)//1024//1024}MB  {outname}")
    except Exception as e:
        print(f"[{i+1}/{len(unique_urls)}] FAILED {url[:60]}: {e}")
        mapping[url] = url  # fallback to original

# Output mapping for use in App.js
import json
with open("/tmp/image_mapping.json", "w") as f:
    json.dump(mapping, f, indent=2)

print(f"\nDone! {len(mapping)} images compressed to /app/frontend/public/images/")
total_size = sum(os.path.getsize(os.path.join(OUTPUT_DIR, f)) for f in os.listdir(OUTPUT_DIR) if f.endswith('.jpg'))
print(f"Total size: {total_size // 1024 // 1024}MB")
