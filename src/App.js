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
		nazev: 'name',
		castka: 'amount',
		manzelky: 'wives',
		prijmeni: 'surname',
		prvni: 'first',
		druha: 'second',
		deti: 'children',
		osoba: 'person',
		prarodice: 'grandparents',
		deda: 'grandfather',
		babicka: 'grandmother',
		jmeno: 'firstname',
		banka: 'bank',
		CSOB: 'CSOB2',
		KB: 'KB2',
		adresa: 'address'
	};
	let wrappedEntity = wrap({entity: ent, getDictionary: (ent) => dictionary});
	ent.object = {
		jmeno: 'Aaa',
		prijmeni: 'Bbb',
		adresa: 'Add007'
	};
	wrappedEntity.object = {
		firstname: 'Eee',
		surname: 'Fff'
	};
	wrappedEntity.wives.first.person = {
		firstname: 'Eee',
		surname: 'Fff',
		kolace: [{prvni: 125}, {druhy: 456}]
	};
	ent.manzelky.prvni.osoba.jmeno='kkkkk';
	console.log(ent.manzelky.prvni.osoba.jmeno, wrappedEntity.wives.first.person.firstname);
	console.log(wrappedEntity.wives.first.person.kolace[0].first, ent.manzelky.prvni.osoba.kolace[0].prvni);
	console.log(ent, wrappedEntity);
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
