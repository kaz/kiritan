import os
import json
import pickle
from PIL import Image
from datetime import datetime

try:
	os.mkdir('static/cache')
except:
	pass

with open('library.pickle', 'rb') as f:
	library = pickle.load(f)

newlib = {}
for key in library.keys():
	library[key] = json.loads(library[key])

	canvas = Image.new('RGB', (500, 775), (255, 255, 255))
	for img in library[key]:
		img = Image.open('static/im6167817/%s.png' % img, 'r')
		canvas.paste(img, (0, 0), img)

	resized = canvas.resize((canvas.size[0] * 3, canvas.size[1] * 3), Image.LANCZOS)
	header = resized.crop((0, 1100, 0 + 1500, 1100 + 500))
	icon = resized.crop((310, 390, 310 + 710, 390 + 710))

	ts = int(datetime.strptime(key, '%Y/%m/%d %H:%M:%S').timestamp())
	path = 'static/cache/%d' % ts

	os.mkdir(path)
	canvas.save('%s/canvas.png' % path, 'png')
	header.save('%s/header.png' % path, 'png')
	icon.save('%s/icon.png' % path, 'png')

	newlib[ts] = {
		'datetime': key,
		'type': 'im6167817',
		'data': library[key],
	}

with open('cache.db', 'wb') as f:
	pickle.dump(newlib, f)
