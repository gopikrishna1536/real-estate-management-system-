/**
 * Residential Parking Space Allocator & EV Charger Assignment
 */
export class ParkingSpaceAllocator {
  static assignSlots(units, availableSlots) {
    const assignments = [];
    const unassignedUnits = [];
    const pool = [...availableSlots];

    for (const u of units) {
      const matchIdx = pool.findIndex(s => s.hasEVCharger === u.requiresEVCharger);
      if (matchIdx !== -1) {
        const slot = pool.splice(matchIdx, 1)[0];
        assignments.push({
          unitId: u.unitId,
          slotNumber: slot.slotNumber,
          hasEVCharger: slot.hasEVCharger
        });
      } else {
        unassignedUnits.push(u.unitId);
      }
    }

    return {
      assignments,
      unassignedUnits,
      remainingSlotsCount: pool.length
    };
  }
}
