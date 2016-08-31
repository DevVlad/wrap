//need to unmock all packages from dependencies of '../wrap.js' !!!
jest.unmock('../wrap.js');
jest.unmock('harmony-reflect');

import 'harmony-reflect';
import { wrap } from '../wrap.js';

describe('wrap test', () => {
	const dictionary = {
		name: 'nazev',
		amount: 'castka',
		address: 'adresa',
		city: 'mesto',
		firstname: 'jmeno',
		surname: 'prijmeni',
		first: 'prvni',
		second: 'druhy',
		field: 'pole',
		length: 'delka'
	};
	let e = { id: 123, nazev: 'aaa', castka: 100.00 };
	let f = wrap({entity: e, getDictionary: (e) => dictionary});

  it('init', () => {
		expect(e.id).toEqual(123);
		expect(e.nazev).toEqual('aaa');
		expect(e.castka).toEqual(100.00);
		expect(f.id).toEqual(123);
		expect(f.name).toEqual('aaa');
		expect(f.amount).toEqual(100.00);
  });

	it('id change', () => {
		expect(e.id).toEqual(123);
		expect(f.id).toEqual(123);
		f.id = 234;
		expect(e.id).toEqual(234);
		expect(f.id).toEqual(234);
		e.id = 345;
		expect(e.id).toEqual(345);
		expect(f.id).toEqual(345);
	});

	it('name/nazev change', () => {
		f.name = 'bbb';
		expect(e.nazev).toEqual('bbb');
		expect(f.name).toEqual('bbb');
		e.nazev = 'ccc';
		expect(e.nazev).toEqual('ccc');
		expect(f.name).toEqual('ccc');
	});

	it('amount/castka change', () => {
		f.amount = 200.45;
		expect(e.castka).toEqual(200.45);
		expect(f.amount).toEqual(200.45);
		e.castka = 100;
		expect(e.castka).toEqual(100);
		expect(f.amount).toEqual(100);
	});

	it('inserting object e -> f', () => {
		e.object = {
			jmeno: 'Aaa',
			prijmeni: 'Bbb',
			adresa: 'Add007'
		};
		expect(f.object.firstname).toEqual('Aaa');
		expect(e.object.jmeno).toEqual('Aaa');
		expect(f.object.surname).toEqual('Bbb');
		expect(e.object.prijmeni).toEqual('Bbb');
		expect(f.object.address).toEqual('Add007');
		expect(e.object.adresa).toEqual('Add007');
	});

	it('inserting object f -> e', () => {
		f.object = {
			firstname: 'Eee',
			surname: 'Fff',
			address: 'Zaa007'
		};
		expect(f.object.firstname).toEqual('Eee');
		expect(f.object.surname).toEqual('Fff');
		expect(f.object.address).toEqual('Zaa007');
		expect(e.object.jmeno).toEqual('Eee');
		expect(e.object.prijmeni).toEqual('Fff');
		expect(e.object.adresa).toEqual('Zaa007');
	});

	it('unknown record in dictionary', () => {
		f.object = {
			stav: 'xxx'
		};
		expect(f.object.stav).toEqual('xxx');
		expect(e.object.stav).toEqual('xxx');
	});

	it('array of entities', () => {
		e.pole = [
			{prvni: 123},
			{druhy: 456}
		];
		expect(e.pole[0].prvni).toEqual(123);
		expect(f.field[0].first).toEqual(123);
		expect(e.pole[1].druhy).toEqual(456);
		expect(f.field[1].second).toEqual(456);

		f.object.field = [
			{firstname: 'xxx', surname: 'zzz'},
			{firstname: 'yyy', surname: 'uuu'}
		];
		expect(f.object.field[0].firstname).toEqual('xxx');
		expect(f.object.field[0].surname).toEqual('zzz');
		expect(f.object.field[1].firstname).toEqual('yyy');
		expect(f.object.field[1].surname).toEqual('uuu');
		expect(e.object.pole[0].jmeno).toEqual('xxx');
		expect(e.object.pole[0].prijmeni).toEqual('zzz');
		expect(e.object.pole[1].jmeno).toEqual('yyy');
		expect(e.object.pole[1].prijmeni).toEqual('uuu');
	});

	it('deep nested - inserting structure e -> f', () => {
		e.object.mesto = {
			adresa: 'Rrrr899',
			nazev: {
				jmeno: 'koko8',
				prijmeni: 'lolo9',
				retezec: [
					{prvni: 1}, {druhy: 2}, {castka: 450}
				]
			}
		};
		expect(e.object.mesto.adresa).toEqual('Rrrr899');
		expect(e.object.mesto.nazev.jmeno).toEqual('koko8');
		expect(e.object.mesto.nazev.prijmeni).toEqual('lolo9');
		expect(e.object.mesto.nazev.retezec[0].prvni).toEqual(1);
		expect(e.object.mesto.nazev.retezec[1].druhy).toEqual(2);
		expect(e.object.mesto.nazev.retezec[2].castka).toEqual(450);
		expect(f.object.city.address).toEqual('Rrrr899');
		expect(f.object.city.name.firstname).toEqual('koko8');
		expect(f.object.city.name.surname).toEqual('lolo9');
		expect(f.object.city.name.retezec[0].first).toEqual(1);
		expect(f.object.city.name.retezec[1].second).toEqual(2);
		expect(f.object.city.name.retezec[2].amount).toEqual(450);
	});

	it('deep nested - inserting structure f -> e', () => {
		f.object.city = {
			address: 'Rrrr899a',
			name: {
				firstname: 'koko8a',
				surname: 'lolo9a',
				retezec: [
					{first: 11}, {
						second: 22,
						field: [
							{first: 1, second: 2},
							{first: 11, second: 22}
						]
					}, {amount: 4500}
				]
			}
		};
		expect(e.object.mesto.adresa).toEqual('Rrrr899a');
		expect(e.object.mesto.nazev.jmeno).toEqual('koko8a');
		expect(e.object.mesto.nazev.prijmeni).toEqual('lolo9a');
		expect(e.object.mesto.nazev.retezec[0].prvni).toEqual(11);
		expect(e.object.mesto.nazev.retezec[1].druhy).toEqual(22);
		expect(e.object.mesto.nazev.retezec[1].field[0].first).toEqual(1);
		expect(e.object.mesto.nazev.retezec[1].field[0].second).toEqual(2);
		expect(e.object.mesto.nazev.retezec[1].field[1].first).toEqual(11);
		expect(e.object.mesto.nazev.retezec[1].field[1].second).toEqual(22);
		expect(e.object.mesto.nazev.retezec[2].castka).toEqual(4500);
		expect(f.object.city.address).toEqual('Rrrr899a');
		expect(f.object.city.name.firstname).toEqual('koko8a');
		expect(f.object.city.name.surname).toEqual('lolo9a');
		expect(f.object.city.name.retezec[0].first).toEqual(11);
		expect(f.object.city.name.retezec[1].second).toEqual(22);
		expect(f.object.city.name.retezec[1].field[0].first).toEqual(1);
		expect(f.object.city.name.retezec[1].field[0].second).toEqual(2);
		expect(f.object.city.name.retezec[1].field[1].first).toEqual(11);
		expect(f.object.city.name.retezec[1].field[1].second).toEqual(22);
		expect(f.object.city.name.retezec[2].amount).toEqual(4500);
	});

	it ('length of proxy test', () => {
		f.field = [
			{name: 'aaa'},
			{name: 'bbb'}
		];
		expect(f.field[0].name).toEqual('aaa');
		expect(f.field[1].name).toEqual('bbb');
		expect(e.pole[0].nazev).toEqual('aaa');
		expect(e.pole[1].nazev).toEqual('bbb');
		expect(f.field.length).toEqual(2);
		expect(e.pole.length).toEqual(2);
	});

});
