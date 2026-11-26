package in.qivanta.gates;

public record GateRecommendation(
        String gateId,
        String gateName,
        double occupancyPercent,
        String reason
) {}
