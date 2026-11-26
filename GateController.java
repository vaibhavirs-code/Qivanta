package in.qivanta.gates;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class GateController {
    private final GateService gateService;

    public GateController(GateService gateService) {
        this.gateService = gateService;
    }

    @GetMapping("/health")
    public Map<String, String> health() {
        return Map.of("status", "UP", "service", "Qivanta API");
    }

    @GetMapping("/gates")
    public List<Gate> gates() {
        return gateService.getGates();
    }

    @PostMapping("/gates/recommend")
    public ResponseEntity<?> recommendGate() {
        return gateService.recommendGate()
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.CONFLICT)
                        .body(Map.of("message", "No open gate currently has capacity.")));
    }
}
