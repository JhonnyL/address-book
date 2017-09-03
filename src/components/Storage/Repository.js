import uuidv1 from 'uuid/v1';

export const findAll = resource =>
  new Promise(resolve =>
    resolve(JSON.parse(localStorage.getItem(resource)) || []),
  );

export const find = (resource, id) =>
  findAll(resource).then(items =>
    new Promise(resolve =>
      resolve(items.find(item => item.id === id)),
    ),
  );

export const create = (resource, data) =>
  findAll(resource).then((items) => {
    items.push(Object.assign({}, data, { id: uuidv1() }));
    return new Promise(resolve =>
      resolve(localStorage.setItem(resource, JSON.stringify(items))),
    );
  });

export const remove = (resource, id) =>
  findAll(resource).then((items) => {
    const newData = items.filter(item => item.id !== id);
    return new Promise(resolve =>
      resolve(localStorage.setItem(resource, JSON.stringify(newData))),
    );
  });

export const update = (resource, id, data) =>
  find(resource, id).then((item) => {
    const newData = Object.assign({}, item, data);
    return remove(resource, id).then(() => create(resource, newData));
  });
