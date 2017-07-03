from PIL import Image

def __im6167817_init():
	return Image.new('RGB', (500, 775), (255, 255, 255))

def __im6167817_convert(canvas):
	canvas = canvas.resize((canvas.size[0] * 3, canvas.size[1] * 3), Image.LANCZOS)
	header = canvas.crop((0, 1100, 0 + 1500, 1100 + 500))
	icon = canvas.crop((310, 390, 310 + 710, 390 + 710))
	return (canvas, header, icon)

def init(type):
	if type == "im6167817":
		return __im6167817_init()
	else:
		raise "No such type"

def convert(type, canvas):
	if type == "im6167817":
		return __im6167817_convert(canvas)
	else:
		raise "No such type"
