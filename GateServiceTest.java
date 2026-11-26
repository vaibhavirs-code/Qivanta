package in.qivanta.gates;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class GateServiceTest {
    @Test
    void recommendsOpenGateWithLowestOccupancy() {
        GateService service = new GateService();
        GateRecommendation recommendation = service.recommendGate().orElseThrow();

        assertEquals("G-B", recommendation.gateId());
        assertEquals(35.0, recommendation.occupancyPercent());
    }
}
