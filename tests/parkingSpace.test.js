import test from 'node:test';
import assert from 'node:assert/strict';
import { ParkingSpaceAllocator } from '../src/utils/parkingSpaceAllocator.js';

test('Parking Space Allocator Tests', async (t) => {
  await t.test('should match EV and regular vehicles to respective parking stalls', () => {
    const units = [
      { unitId: '101', requiresEVCharger: true },
      { unitId: '102', requiresEVCharger: false }
    ];
    const slots = [
      { slotNumber: 'P-01', hasEVCharger: false },
      { slotNumber: 'P-02', hasEVCharger: true }
    ];
    const res = ParkingSpaceAllocator.assignSlots(units, slots);
    assert.equal(res.assignments.length, 2);
    assert.equal(res.unassignedUnits.length, 0);
  });
});
