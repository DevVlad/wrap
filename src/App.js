import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { wrap, unwrap } from './wrap/wrap.js'

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
		ent,
		(ent) => {
				if (Array.isArray(ent)) {
					return {};
				} else {
					return dictionary;
				}
		}
	);

	ent.object = {
		jmeno: 'Aaa',
		prijmeni: 'Bbb',
		adresa: 'Add007'
	};
	wrappedEntity.object.mesto = {
		adresa: 'Rrrr899',
		nazev: {
			jmeno: 'koko8',
			prijmeni: 'lolo9',
			retezec: [
				{prvni: 1}, {druha: 2}, {castka: 450}
			]
		}
	};
	console.log(ent, wrappedEntity.object.mesto.name.retezec[1].second);

	const unwrappedEnt = unwrap(wrappedEntity);
	console.log('UNWRAP', unwrappedEnt);

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
