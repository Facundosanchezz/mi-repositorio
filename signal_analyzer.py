"""
Biosignal-AI Analytics
Procesamiento y detección de anomalías en señales biomédicas
Autor: Facundo Sánchez
"""

import numpy as np
import pandas as pd
import json
from pathlib import Path

class BiosignalAnalyzer:
    """Analizador de señales biomédicas con detección automática de anomalías."""
    
    def __init__(self, sampling_rate=1000, duration=10, noise_level=0.5):
        """
        Inicializa el analizador.
        
        Args:
            sampling_rate: Muestras por segundo (Hz)
            duration: Duración de la señal en segundos
            noise_level: Intensidad del ruido gaussiano (0-1)
        """
        self.sampling_rate = sampling_rate
        self.duration = duration
        self.noise_level = noise_level
        self.time = None
        self.signal = None
        self.filtered_signal = None
        self.anomalies = None
        self.stats = None
    
    def generate_ecg_signal(self):
        """
        Genera una señal simulada de ECG (Electrocardiograma).
        Simula un patrón cardíaco normal con componentes sinusoidales.
        """
        # Crear vector de tiempo
        num_samples = self.sampling_rate * self.duration
        self.time = np.linspace(0, self.duration, num_samples)
        
        # Componentes del ECG simulado (múltiples frecuencias)
        # P-wave (baja frecuencia)
        p_wave = 0.2 * np.sin(2 * np.pi * 1 * self.time)
        
        # QRS complex (frecuencia media, amplitud alta)
        qrs_complex = 1.0 * np.sin(2 * np.pi * 3 * self.time) * np.exp(-0.1 * self.time)
        
        # T-wave (frecuencia baja)
        t_wave = 0.3 * np.sin(2 * np.pi * 1.5 * self.time + np.pi/3)
        
        # Combinar componentes
        clean_signal = p_wave + qrs_complex + t_wave
        
        # Agregar ruido gaussiano
        noise = np.random.normal(0, self.noise_level, len(clean_signal))
        self.signal = clean_signal + noise
        
        print(f"✓ Señal ECG generada: {len(self.signal)} muestras en {self.duration}s")
        return self.time, self.signal
    
    def add_anomalies(self, num_anomalies=3):
        """
        Introduce anomalías artificiales en la señal.
        Simula arritmias o picos anómalos.
        
        Args:
            num_anomalies: Cantidad de anomalías a introducir
        """
        if self.signal is None:
            raise ValueError("Primero genera la señal con generate_ecg_signal()")
        
        # Copiar la señal para no modificar la original
        signal_with_anomalies = self.signal.copy()
        anomaly_indices = []
        
        # Generar anomalías en posiciones aleatorias
        for _ in range(num_anomalies):
            idx = np.random.randint(100, len(signal_with_anomalies) - 100)
            
            # Crear un pico anómalo (amplitud alta)
            amplitude = np.random.choice([2.5, -2.5])  # Pico positivo o negativo
            width = np.random.randint(10, 30)
            
            # Aplicar anomalía gaussiana
            anomaly = amplitude * np.exp(-(np.arange(width) - width/2)**2 / (width/4)**2)
            signal_with_anomalies[idx:idx+width] += anomaly
            anomaly_indices.extend(range(idx, min(idx+width, len(signal_with_anomalies))))
        
        self.signal = signal_with_anomalies
        print(f"✓ {num_anomalies} anomalías introducidas en índices: {sorted(set(anomaly_indices))[:5]}...")
        return anomaly_indices
    
    def filter_signal(self, window_size=15):
        """
        Filtra la señal usando media móvil (Moving Average).
        Reduce ruido mientras preserva las características principales.
        
        Args:
            window_size: Tamaño de la ventana de filtrado
        """
        if self.signal is None:
            raise ValueError("Primero genera la señal")
        
        # Usar Pandas para filtrado eficiente
        df = pd.Series(self.signal)
        self.filtered_signal = df.rolling(window=window_size, center=True).mean().fillna(df)
        self.filtered_signal = self.filtered_signal.values
        
        print(f"✓ Señal filtrada con ventana de {window_size} muestras")
        return self.filtered_signal
    
    def detect_anomalies(self, threshold_std=2.5):
        """
        Detecta anomalías usando análisis estadístico.
        Identifica puntos que se desvían significativamente de la media.
        
        Args:
            threshold_std: Número de desviaciones estándar para considerar anomalía
        """
        if self.filtered_signal is None:
            self.filter_signal()
        
        # Calcular residuos (diferencia entre señal original y filtrada)
        residuals = np.abs(self.signal - self.filtered_signal)
        
        # Calcular media y desviación estándar
        mean_residual = np.mean(residuals)
        std_residual = np.std(residuals)
        
        # Identificar anomalías
        threshold = mean_residual + (threshold_std * std_residual)
        anomaly_mask = residuals > threshold
        self.anomalies = np.where(anomaly_mask)[0]
        
        print(f"✓ Anomalías detectadas: {len(self.anomalies)} puntos")
        print(f"  Threshold: {threshold:.4f}, Mean: {mean_residual:.4f}, Std: {std_residual:.4f}")
        return self.anomalies
    
    def calculate_statistics(self):
        """
        Calcula estadísticas de la señal.
        """
        if self.signal is None:
            raise ValueError("Primero genera la señal")
        
        self.stats = {
            "mean": float(np.mean(self.signal)),
            "std": float(np.std(self.signal)),
            "min": float(np.min(self.signal)),
            "max": float(np.max(self.signal)),
            "anomaly_count": int(len(self.anomalies)) if self.anomalies is not None else 0,
            "signal_duration_seconds": float(self.duration),
            "sampling_rate_hz": int(self.sampling_rate)
        }
        
        print(f"✓ Estadísticas calculadas")
        return self.stats
    
    def export_to_json(self, filename="signal_data.json"):
        """
        Exporta los datos en formato JSON para usar en React.
        
        Args:
            filename: Nombre del archivo JSON
        """
        if self.signal is None or self.filtered_signal is None:
            raise ValueError("Primero procesa la señal completa")
        
        # Crear estructura de datos
        data = {
            "metadata": {
                "title": "Biosignal ECG Analysis",
                "description": "Simulación de señal ECG con detección de anomalías",
                "created_at": pd.Timestamp.now().isoformat(),
                **self.stats
            },
            "data": [
                {
                    "index": int(i),
                    "time": float(self.time[i]),
                    "original": float(self.signal[i]),
                    "filtered": float(self.filtered_signal[i]),
                    "is_anomaly": bool(i in self.anomalies),
                    "residual": float(np.abs(self.signal[i] - self.filtered_signal[i]))
                }
                for i in range(len(self.signal))
            ]
        }
        
        # Guardar a archivo
        output_path = Path("public") / filename
        output_path.parent.mkdir(parents=True, exist_ok=True)
        
        with open(output_path, 'w') as f:
            json.dump(data, f, indent=2)
        
        print(f"✓ Datos exportados a: {output_path}")
        return str(output_path)
    
    def run_full_analysis(self):
        """
        Ejecuta el análisis completo: generar → procesar → detectar → exportar.
        """
        print("\n" + "="*50)
        print("BIOSIGNAL-AI ANALYTICS")
        print("="*50 + "\n")
        
        self.generate_ecg_signal()
        self.add_anomalies(num_anomalies=4)
        self.filter_signal(window_size=15)
        self.detect_anomalies(threshold_std=2.5)
        self.calculate_statistics()
        self.export_to_json("signal_data.json")
        
        print("\n" + "="*50)
        print("✓ ANÁLISIS COMPLETADO")
        print("="*50 + "\n")
        
        # Resumen final
        print(f"Resumen:")
        print(f"  • Duración: {self.duration}s")
        print(f"  • Muestras: {len(self.signal)}")
        print(f"  • Anomalías detectadas: {len(self.anomalies)}")
        print(f"  • Rango de valores: [{self.stats['min']:.2f}, {self.stats['max']:.2f}]")


# ============================================================================
# EJECUTAR ANÁLISIS
# ============================================================================

if __name__ == "__main__":
    analyzer = BiosignalAnalyzer(
        sampling_rate=500,   # ← Mitad de datos
        duration=5,          # ← Mitad de duración
        noise_level=0.5
    )
