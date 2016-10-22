import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';
import { initializeQUnitAssertions } from 'ember-message-bus';
import multiton from 'ember-multiton-service';

const { getOwner } = Ember;

moduleFor('service:affinity-engine/sound-manager-createjs', 'Unit | Service | affinity engine/sound manager createjs', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
  integration: true,

  beforeEach() {
    const appInstance = getOwner(this);

    initializeQUnitAssertions(appInstance, 'eBus', Ember.Object.extend({ eBus: multiton('message-bus', 'engineId'), engineId: 'bar' }));
  }
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let service = this.subject({ engineId: 'bar' });
  assert.ok(service);
});
