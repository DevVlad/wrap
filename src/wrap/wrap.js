/*
*	unable to test Symbols
*	https://github.com/tvcutsem/harmony-reflect/issues/57
*	switched for now to uuid
*/
const unwrapSymbol = 'unwrap-33c1b4d8-b994-4248-ad1b-ccac9182395f';

const translate = (key, dict) => dict[key] || key;

const handleSimpArr = (arr, func) => arr.map(subArr => typeof subArr === 'object' ? func(subArr) : subArr);

const translateEntity = (entity, getDictionary) => {

const transEnt = (entity, getDictionary) => {
		let newEnt = {};
		Object.keys(entity).forEach(key => {
			let val = entity[key];
			if (Array.isArray(val)) {
				val = handleSimpArr(val, e => transEnt(e, getDictionary));
			} else if (typeof val === 'object') {
				val = transEnt(val, getDictionary);
			}
			newEnt[translate(key, getDictionary(entity))] = val;
		});
		return Array.isArray(entity) ? entity : newEnt;
	};
	return transEnt(entity, getDictionary);
};

const unwrapInternal = (entity) => {

	const unwrapEnt = (ent) => {
		let newEnt = {};
		Object.keys(ent).forEach(key => {
			let val = ent[key];
			if (Array.isArray(val)) {
				val = handleSimpArr(val, unwrapEnt);
			} else if (typeof val === 'object') {
				val = unwrapEnt(val);
			}
			newEnt[key] = val;
		});
		return Array.isArray(ent) ? ent : newEnt;
	};
	return unwrapEnt(entity);
};

const wrapInternal = (entity, getDictionary) => {

	const wrapEnt = (entity, getDictionary) => {
		if (Array.isArray(entity)) {
			return entity.map(e => wrapEnt(e, getDictionary));
		} else if (typeof entity === 'object') {
			const dict = getDictionary(entity);

			return new Proxy(entity, {
				get(entity, prop) {
					if (prop === unwrapSymbol) {
						return unwrapInternal(entity);
					} else {
						return wrapEnt(entity[translate(prop, dict)], getDictionary);
					}
				},
				set(entity, prop, val) {
					if (Array.isArray(val)) {
						entity[translate(prop, dict)] = handleSimpArr(val, e => wrapEnt(translateEntity(e, getDictionary), getDictionary));
					} else if (typeof val === 'object') {
						let subRes = {};
						Object.keys(val).forEach(v => {
							const key = val[v];
							subRes[translate(v, dict)] = typeof key === 'object' ? wrapEnt(translateEntity(key, getDictionary), getDictionary) : key;
						});
						entity[translate(prop, dict)] = subRes;
					} else {
						entity[translate(prop, dict)] = val;
					}
					return true;
				}
			});
		} else {
			return entity;
		}
	};
	return wrapEnt(entity, getDictionary);
};

//	exports
export const unwrap = (entity) => {
	return entity[unwrapSymbol];
};

export const wrap = (entity, getDictionary) => {
	return wrapInternal(entity, getDictionary);
};
