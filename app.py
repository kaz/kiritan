import os
import json
import flask
import pickle
import tweepy
from PIL import Image
from datetime import datetime

import imagejob

app = flask.Flask(__name__)

CONSUMER_KEY = ''
CONSUMER_SECRET = ''
ACCESS_TOKEN = ''
ACCESS_SECRET = ''

auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
auth.set_access_token(ACCESS_TOKEN, ACCESS_SECRET)
twitter = tweepy.API(auth)

try:
	os.mkdir('static/cache')
except:
	pass

try:
	with open('cache.db', 'rb') as f:
		library = pickle.load(f)
except:
	library = {}

@app.route('/', methods=['GET'])
def get():
	return flask.render_template('index.html', host=flask.request.host)

@app.route('/', methods=['POST'])
def post():
	type = flask.request.form['type']
	data = json.loads(flask.request.form['data'])

	canvas = imagejob.init(type)
	for img in data:
		img = Image.open('static/%s/%s.png' % (type, img), 'r')
		canvas.paste(img, (0, 0), img)

	header, icon = imagejob.convert(type, canvas)

	now = datetime.now()
	ts = int(now.timestamp())

	os.mkdir(path)
	canvas.save('static/cache/canvas.png')
	header.save('static/cache/header.png')
	icon.save('static/cache/icon.png')

	library[ts] = {
		'datetime': now.strftime('%Y/%m/%d %H:%M:%S'),
		'type': type,
		'data': data,
	}
	with open('cache.db', 'wb') as f:
		pickle.dump(library, f)

	twitter.update_profile_banner('static/cache/header.png')
	twitter.update_profile_image('static/cache/icon.png')

	return flask.redirect('/', code=302)

@app.route('/data.json')
def data():
	return flask.jsonify(library)

if __name__ == '__main__':
	app.run(host='0.0.0.0', port=8000, debug=True)
