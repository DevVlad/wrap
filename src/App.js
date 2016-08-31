import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {wrap} from './wrap/wrap.js'

const wrapFunction = () => {
	let ent = {
		id: 123,
		nazev: 'aaa',
		castka: 100.00,
		manzelky: {
			prvni: {
				deti: ['Pavel', 'Petr'],
				osoba: 'Karolina',
				prarodice: {
					deda: 'v pohode',
					babicka: 'cajk',
					banka: [{CSOB: 21555}, {KB: 122000}]
				}
			},
			druha: {
				deti: ['alena', 'lojzik'],
				osoba: 'Jana'
			},
		},
		prijmeni: 'Nevim',
	};
	const dictionary = {
		name: 'nazev',
		amount: 'castka',
		wives: 'manzelky',
		surname: 'prijmeni',
		first: 'prvni',
		second: 'druha',
		children: 'deti',
		person: 'osoba',
		grandparents: 'prarodice',
		grandfather: 'deda',
		grandmother: 'babicka',
		firstname: 'jmeno',
		bank: 'banka',
		CSOB2: 'CSOB',
		KB2: 'KB',
		address: 'adresa',
		field: 'pole'
	};

	let wrappedEntity = wrap(
		{
			entity: ent,
			getDictionary: (ent) => {
				if (Array.isArray(ent)) {
					return {};
				} else {
					return dictionary;
				}
			}
		}
	);

	ent.object = {
		jmeno: 'Aaa',
		prijmeni: 'Bbb',
		adresa: 'Add007'
	};
	wrappedEntity.wives.first.person = {
		firstname: 'Eee',
		surname: 'Fff',
		kolace: [
			{first: 125},
			{second: 456}
		]
	};
	wrappedEntity.field = [
		{first: 1}, {second: 2}, {amount: 450}
	];
	ent.object.mesto = {
		adresa: 'Rrrr899',
		nazev: {
			jmeno: 'koko8',
			prijmeni: 'lolo9',
			retezec: [
				{prvni: 1}, {druha: 2}, {castka: 450}
			]
		}
	};
	console.log(ent, wrappedEntity);
	console.log(ent.object.mesto.nazev.retezec[0].prvni);
	console.log(wrappedEntity.object.mesto.name.retezec[1].second);
	console.log('ent',ent.pole[0].prvni,'wrapped', wrappedEntity.field[0].first);
	console.log('kolace 125','wrap',wrappedEntity.wives.first.person.kolace[0].first,'ent', ent.manzelky.prvni.osoba.kolace[0].prvni);

};

class App extends Component {

  render() {
		wrapFunction()
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
      </div>
    );
  }
}

export default App;
