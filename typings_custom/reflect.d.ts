declare namespace Reflect {
  function getMetadata(type: string, target: Object, propertyKey: string): any;
  function getMetadata(type: 'design:paramtypes', target: Object, propertyKey: string): Object[];
}
