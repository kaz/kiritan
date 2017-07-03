from PIL import Image

def __im6167817_init():
	return Image.new('RGB', (500, 775), (255, 255, 255))

def __im6167817_convert(canvas):
	resized = canvas.resize((canvas.size[0] * 3, canvas.size[1] * 3), Image.LANCZOS)
	header = resized.crop((0, 1100, 0 + 1500, 1100 + 500))
	icon = resized.crop((310, 390, 310 + 710, 390 + 710))
	return (header, icon)

def __im6447064_init():
	return Image.new('RGB', (1000, 1250), (255, 255, 255))

def __im6447064_convert(canvas):
	resized = canvas.resize((canvas.size[0] * 2, canvas.size[1] * 2), Image.LANCZOS)
	header = resized.crop((300, 1000, 300 + 1500, 1000 + 500))
	icon = resized.crop((620, 180, 620 + 710, 180 + 710))
	return (header, icon)

def init(type):
	if type == "im6167817":
		return __im6167817_init()
	if type == "im6447064":
		return __im6447064_init()
	else:
		raise "No such type"

def convert(type, canvas):
	if type == "im6167817":
		return __im6167817_convert(canvas)
	if type == "im6447064":
		return __im6447064_convert(canvas)
	else:
		raise "No such type"
