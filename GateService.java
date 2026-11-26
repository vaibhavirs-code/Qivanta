package in.qivanta.gates;

import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
public class GateService {
    // Demo data only. The next milestone replaces this with PostgreSQL-backed records.
    private final List<Gate> demoGates = List.of(
            new Gate("G-A", "Gate A", 100, 90, GateStatus.OPEN),
            new Gate("G-B", "Gate B", 100, 35, GateStatus.OPEN),
            new Gate("G-C", "Gate C", 100, 60, GateStatus.OPEN)
    );

    public List<Gate> getGates() {
        return demoGates;
    }

    public Optional<GateRecommendation> recommendGate() {
        return demoGates.stream()
                .filter(Gate::canAcceptVisitors)
                .min(Comparator.comparingDouble(Gate::occupancyPercent))
                .map(gate -> new GateRecommendation(
                        gate.id(),
                        gate.name(),
                        gate.occupancyPercent(),
                        "Lowest occupancy among currently open gates"
                ));
    }
}
