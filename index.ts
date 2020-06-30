// Copyright (c) 2020, Hugues Guilleus for Arveto Ink.
// All rights reserved.
// Use of this source code is governed by a BSD
// license that can be found in the LICENSE file.

document.addEventListener("DOMContentLoaded", () => {
	let date = <HTMLInputElement>document.querySelector('input#date');
	let p = <HTMLInputElement>document.querySelector('input#projet');
	function update() {
		generate(date.value, p.value);
	}
	date.addEventListener('input', update);
	p.addEventListener('input', update);
	update();
}, { once: true, });

// Affiche la référence du projet avec la date (peut-être vide) et le
// nom du projet.
function generate(date: string, p: string) {
	let d = date ? new Date(date) : new Date();
	document.getElementById('result').innerText = `${d.getFullYear()
		}-${(d.getMonth() + 1).toString().padStart(2, '0')
		}-${alder32(p)}`;
}

// Calcule un condensé avec l'arlgorithem ALDER 32.
function alder32(input: string): string {
	let a = 1;
	let b = 0;

	// On créé un Uint8 pour avoir une chaîne en UTF-8.
	new TextEncoder().encode(input).forEach(c => {
		a = (a + c) % MOD_ADLER;
		b = (a + b) % MOD_ADLER;
	});

	return Math.abs(b << 16 | a).toString(16).padStart(8, '0').toUpperCase();
}

const MOD_ADLER: number = 65521;
