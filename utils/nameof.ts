/** @example nameof<Person>('name') */
function nameof<TObject>(key: keyof TObject): keyof TObject;

/** @example nameof(person, 'name') */
function nameof<TObject, TKey extends keyof TObject>(obj: TObject, key: TKey): Extract<keyof TObject, TKey>

function nameof<TObject, TKey extends keyof TObject>(key1: TKey, key2?: TKey) {
  return key2 ?? key1;
}

export {
  nameof
}