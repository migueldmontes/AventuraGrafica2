import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const scenes = {
  intro: {
    text: `Te despiertas en un bosque misterioso. ¿Qué quieres hacer?`,
    options: [
      { label: 'Explorar el bosque', next: 'forest' },
      { label: 'Seguir el sendero', next: 'path' }
    ]
  },
  forest: {
    text: `Los árboles son altos y la niebla espesa. Encuentras una cabaña abandonada.`,
    options: [
      { label: 'Entrar en la cabaña', next: 'cabin' },
      { label: 'Volver atrás', next: 'intro' }
    ]
  },
  path: {
    text: `El sendero te lleva a un río. Hay un puente roto.`,
    options: [
      { label: 'Intentar cruzar el puente', next: 'bridge' },
      { label: 'Volver al bosque', next: 'intro' }
    ]
  },
  cabin: {
    text: `Dentro de la cabaña encuentras una llave antigua. Quizás abre algo importante...`,
    options: [
      { label: 'Guardar llave y seguir explorando', next: 'forest', action: 'saveKey' }
    ]
  },
  bridge: {
    text: `¡Oh no! El puente se rompe y caes al agua. Te despiertas en la orilla... de nuevo en el bosque.`,
    options: [
      { label: 'Volver a empezar', next: 'intro' }
    ]
  }
};

export default function AventuraGrafica() {
  const [scene, setScene] = useState('intro');
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    setShowText(false);
    const timer = setTimeout(() => setShowText(true), 500);
    return () => clearTimeout(timer);
  }, [scene]);

  const handleOptionClick = (option) => {
    if (option.action === 'saveKey') {
      localStorage.setItem('tieneLlave', 'true');
      console.log('Llave guardada en localStorage');
    }
    setScene(option.next);
  };

  const currentScene = scenes[scene];

  useEffect(() => {
    const tieneLlave = localStorage.getItem('tieneLlave') === 'true';
    if (tieneLlave) {
      console.log('Ya tienes la llave guardada');
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-100 p-4">
      <Card className="max-w-md w-full shadow-xl p-6">
        <CardContent>
          {showText ? (
            <>
              <p className="text-lg mb-4">{currentScene.text}</p>
              <div className="space-y-2">
                {currentScene.options.map((option, index) => (
                  <Button
                    key={index}
                    className="w-full"
                    onClick={() => handleOptionClick(option)}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </>
          ) : (
            <p className="text-lg animate-pulse">Cargando historia...</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
