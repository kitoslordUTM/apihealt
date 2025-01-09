"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const patientRoute_1 = __importDefault(require("./routes/patientRoute"));
const medicRoute_1 = __importDefault(require("./routes/medicRoute"));
const alertRoute_1 = __importDefault(require("./routes/alertRoute"));
const notifyRoute_1 = __importDefault(require("./routes/notifyRoute"));
const vitalSignRoute_1 = __importDefault(require("./routes/vitalSignRoute"));
const medicActionRoute_1 = __importDefault(require("./routes/medicActionRoute"));
const MedicHistorial_1 = __importDefault(require("./routes/MedicHistorial"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3007;
// Middleware para habilitar CORS
app.use((0, cors_1.default)());
// Middleware para parsear JSON
app.use(express_1.default.json());
app.use('/patient', patientRoute_1.default);
app.use('/medic', medicRoute_1.default);
app.use('/alert', alertRoute_1.default);
app.use('/notify', notifyRoute_1.default);
app.use('/vital', vitalSignRoute_1.default);
app.use('/action', medicActionRoute_1.default);
app.use('/historial', MedicHistorial_1.default);
app.use('/user', userRoute_1.default);
// Ruta de prueba
app.get('/', (req, res) => {
    res.send('¡Hola, mundo desde TypeScript!');
});
// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
