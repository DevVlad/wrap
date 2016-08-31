const translate = (key, dict) => dict[key] || key;

const translateEntity = (entity, getDictionary) => {

	const transEnt = (entity, getDictionary) => {
		let newEnt = {};
		Object.keys(entity).forEach(key => {
			let val = entity[key];
			if (Array.isArray(val)) {
				val = val.map(subEnt => {
					if (typeof subEnt === 'object') {
						return transEnt(subEnt, getDictionary);
					}
					else {
						return subEnt;
					}
				});
			} else if (typeof val === 'object') {
				val = transEnt(val, getDictionary);
			}
			newEnt[translate(key, getDictionary(entity))] = val;
		});
		return Array.isArray(entity) ? entity : newEnt;
	};
	return transEnt(entity, getDictionary);
};

export const wrap = ({entity, getDictionary}) => {

	const wrapEnt = (entity, getDictionary) => {
		if (Array.isArray(entity)) {
			return entity.map(e => {
				if (typeof e === 'object') {
					return wrapEnt(translateEntity(e, getDictionary), getDictionary);
				} else {
					return e;
				}
			});
		} else {
			const dict = getDictionary(entity);

			return new Proxy(entity, {
				get(entity, prop) {
					let result = entity[translate(prop, dict)];
					if (Array.isArray(result)) {
						result = result.map(res => {
							if (typeof res === 'object') {
								return wrapEnt(res, getDictionary);
							} else {
								return res;
							}
						});
					} else if (typeof result === 'object') {
						result = wrapEnt(result, getDictionary);
					}
					return result;
				},
				set(entity, prop, val) {
					if (Array.isArray(val)) {
						val = val.map(v => {
							if (typeof v === 'object') {
								return wrapEnt(translateEntity(v, getDictionary), getDictionary);
							} else {
								return v;
							}
						});
						entity[translate(prop, dict)] = val;
					} else if (typeof val === 'object') {
						let subRes = {};
						Object.keys(val).forEach(v => {
							const key = val[v];
							subRes[translate(v, dict)] = typeof key !== 'object' ? key : wrapEnt(translateEntity(key, getDictionary), getDictionary);
						});
						entity[translate(prop, dict)] = subRes;
					} else {
						entity[translate(prop, dict)] = val;
					}
					return true;
				}
			});
		}

	};
	return wrapEnt(entity, getDictionary);
};
