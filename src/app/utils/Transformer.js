export default class Transformer {
  static fetchCollection(data, Model) {
    return data.map(item => Transformer.fetchObject(item, Model));
  }

  static fetchObject(data, Model) {
    return new Model(data);
  }

  static icon(icon) {
    const match = icon ? icon.match(/^([fab|fas|far]*)-?(.+)/) : null;
    if (match != null) {
      const [one, two] = match.splice(1, 2).filter((p) => p.length > 0);
      return [one, two];
    }
    return ['far', 'question-circle'];
  }
}
