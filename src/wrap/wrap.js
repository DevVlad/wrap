import Immutable from 'immutable';
import { flatten, unflatten } from 'flat';

const translate = (key, dictionary) => {
		return dictionary.get(key) || key;
};

const translateEntity = (entity, dictionary) => {
	const flatEntity = flatten(entity);
	const keysOfFlatEntity = Object.keys(flatEntity);
	const translatedKeys = keysOfFlatEntity.map(key => {
		return key.split('.').map(keyToTranslate => translate(keyToTranslate, dictionary)).join('.');
	});
	let outputEntity = {};
	translatedKeys.forEach((translatedKey, index) => {
		outputEntity[translatedKey] = flatEntity[keysOfFlatEntity[index]];
	});
	return unflatten(outputEntity);
};

export const wrap = ({entity, getDictionary}) => {

	const wrapEnt = (entity, getDictionary) => {
		// TODO: cache getting dict
		const dict = Immutable.Map(getDictionary(entity)).flip();

		return new Proxy(entity, {
			get(entity, prop) {
				let result = entity[translate(prop, dict)];
				if (typeof result === 'object' || Array.isArray(result)) {
					result = wrapEnt(result, getDictionary);
				}
				return result;
			},
			set(entity, prop, val) {
				const isValCompl = (typeof val === 'object' || Array.isArray(val));
				val = isValCompl ? translateEntity(val, dict) : val;
				entity[translate(prop, dict)] = isValCompl ? wrapEnt(val, getDictionary) : val;
				return true;
			}
		});
	};
	return wrapEnt(entity, getDictionary);
};
