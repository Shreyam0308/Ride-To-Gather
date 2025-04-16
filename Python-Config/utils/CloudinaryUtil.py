import cloudinary
from cloudinary.uploader import upload

#cloundinary configuration
cloudinary.config(
    cloud_name = "dl4pcqeok",
    api_key="392437467497393",
    api_secret="_Qag-xJQeS99QspdZiLbX01s75A"
)

# util functionn...

async def upload_image(image:bytes):
    result = upload(image)
    print("cloundianry response,",result)
    return result["secure_url"] #stringn