/**
 * @file ChocoAssistantChat.jsx
 * @description Widget de Chat flotante impulsado por Google Gemini AI a través del backend Express.
 */

import React, { useState, useRef, useEffect } from 'react';
import { Button, Card, Form, InputGroup } from 'react-bootstrap';

function ChocoAssistantChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: '¡Hola! 🍫 Soy ChocoBot, tu sumiller virtual experto en cacao colombiano y chocolates artesanales de ChocoArtisan. ¿En qué te puedo asesorar hoy?'
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputVal.trim() || loading) return;

    const userMessage = inputVal.trim();
    setInputVal('');
    setMessages((prev) => [...prev, { sender: 'user', text: userMessage }]);
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/chat-gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error en la comunicación con el backend');
      }

      setMessages((prev) => [...prev, { sender: 'ai', text: data.reply }]);
    } catch (error) {
      console.error('Error al consultar el chat:', error);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: `[Error]: ${error.message || 'No se pudo conectar con el servidor backend.'}`
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1090 }}>
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-circle shadow-lg d-flex align-items-center justify-content-center"
          style={{
            width: '60px',
            height: '60px',
            backgroundColor: '#3E2723',
            borderColor: '#D4AF37',
            color: '#D4AF37',
            fontSize: '24px'
          }}
          title="Abrir Asistente ChocoBot"
        >
          💬
        </Button>
      )}

      {isOpen && (
        <Card
          className="shadow-lg border-0"
          style={{ width: '340px', height: '460px', backgroundColor: '#FFF8E1' }}
        >
          <div
            className="p-3 text-white d-flex justify-content-between align-items-center"
            style={{ 
              backgroundColor: '#3E2723', 
              borderTopLeftRadius: 'calc(.375rem - 1px)', 
              borderTopRightRadius: 'calc(.375rem - 1px)' 
            }}
          >
            <div>
              <span className="fw-bold" style={{ color: '#D4AF37' }}>🍫 ChocoBot IA</span>
              <div className="small text-muted" style={{ fontSize: '11px', color: '#ccc' }}>Asistente Cacaotero</div>
            </div>
            <Button
              variant="link"
              className="text-white text-decoration-none p-0 fs-5"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </Button>
          </div>

          <Card.Body
            className="p-3 overflow-auto d-flex flex-column gap-2"
            style={{ height: '330px', backgroundColor: '#FAF3E0' }}
          >
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-3 small ${
                  m.sender === 'user'
                    ? 'align-self-end text-white'
                    : 'align-self-start bg-white text-dark border'
                }`}
                style={{
                  maxWidth: '80%',
                  backgroundColor: m.sender === 'user' ? '#3E2723' : '#ffffff',
                  color: m.sender === 'user' ? '#fff' : '#3E2723'
                }}
              >
                {m.text}
              </div>
            ))}
            {loading && (
              <div className="align-self-start bg-white p-2 rounded-3 small text-muted border">
                <em>ChocoBot redactando respuesta gourmet...</em>
              </div>
            )}
            <div ref={messagesEndRef} />
          </Card.Body>

          <Card.Footer className="bg-white border-0 p-2">
            <Form onSubmit={handleSendMessage}>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Pregunta sobre cacao o chocolates..."
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  size="sm"
                  style={{ borderColor: '#3E2723' }}
                />
                <Button
                  type="submit"
                  size="sm"
                  style={{ backgroundColor: '#3E2723', borderColor: '#3E2723', color: '#D4AF37' }}
                >
                  Enviar
                </Button>
              </InputGroup>
            </Form>
          </Card.Footer>
        </Card>
      )}
    </div>
  );
}

export default ChocoAssistantChat;