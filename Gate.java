package in.qivanta.gates;

public record Gate(
        String id,
        String name,
        int capacity,
        int currentVisitors,
        GateStatus status
) {
    public double occupancyPercent() {
        if (capacity <= 0) return 100.0;
        return Math.round((currentVisitors * 1000.0 / capacity)) / 10.0;
    }

    public boolean canAcceptVisitors() {
        return status == GateStatus.OPEN && currentVisitors < capacity;
    }
}
