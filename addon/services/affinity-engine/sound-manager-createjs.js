import Ember from 'ember';
import createjs from 'ember-createjs';
import multiton from 'ember-multiton-service';

const {
  Service,
  computed,
  get,
  isBlank,
  set
} = Ember;

export default Service.extend({
  eBus: multiton('message-bus', 'engineId'),

  idMap: computed(() => Ember.Object.create()),

  init(...args) {
    this._super(...args);

    get(this, 'eBus').subscribe('refreshingFromState', this, this.clearSounds);
  },

  findOrCreateInstance(soundId, instanceId = 0) {
    const instance = get(this, `idMap.${soundId}.${instanceId}`);

    return instance || this._createInstance(soundId, instanceId);
  },

  _createInstance(soundId, instanceId) {
    const idMap = get(this, 'idMap');

    if (isBlank(get(idMap, soundId))) {
      set(idMap, soundId, Ember.Object.create());
    }

    const instance = createjs.Sound.createInstance(soundId);

    return set(idMap, `${soundId}.${instanceId}`, instance);
  },

  clearSounds() {
    const idMap = get(this, 'idMap');

    Object.keys(idMap).forEach((mapKey) => {
      const map = get(idMap, mapKey);

      Object.keys(map).forEach((instanceKey) => {
        get(map, instanceKey).stop();
      });
    });

    set(this, 'idMap', Ember.Object.create());
  }
});
