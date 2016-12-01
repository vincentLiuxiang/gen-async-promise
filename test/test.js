// 'use strict'

import test from 'ava';
var gap = require('..');

test('output one param', async (t) => {
	var fs = require('fs');
	var readFile = gap(fs.readFile);
	var buff = null;
	var error = null
	try {
		buff = await readFile(__filename);
	} catch(e) {
		error = e
	}
	if (!error && buff) {
		t.pass()
	} else {
		t.fail()
	}
})

test('output multi params', async (t) => {
	var multi = gap(function (m,cb) {
		setTimeout(() => {
			cb(null,'hello','world')
		}, m);
	});

	var a = "";
	var b = "";
	var error = null;
	try {
		[a,b] = await multi(1000);
	} catch(e) {
		error = e;
	}

	if (!error && a === "hello" && b === "world") {
		t.pass()
	} else {
		t.fail()
	}
})

test('null input param', async (t) => {
	var nullInput = gap(function (cb) {
		setTimeout(() => {
			cb(null,'null input param')
		}, 100);
	});
	var a = "";
	var error = null;
	try {
		a = await nullInput();
	} catch(e) {
		error = e;
	}

	if (!error && a === "null input param") {
		t.pass()
	} else {
		t.fail()
	}
})

test('cb error', async (t) => {
	var errorAsync = gap(function (cb) {
		setTimeout(() => {
			cb(new Error('no input param'))
		}, 100);
	});

	var a = "";
	var error = null;

	try {
		a = await errorAsync();
	} catch(e) {
		error = e;
	}

	if (error.message === 'no input param') {
		t.pass()
	} else {
		t.fail()
	}
})
