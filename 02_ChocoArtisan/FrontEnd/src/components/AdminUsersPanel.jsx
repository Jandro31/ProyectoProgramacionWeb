import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Alert, Badge } from 'react-bootstrap';

function AdminUsersPanel() {
  const [usuarios, setUsuarios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newUsuario, setNewUsuario] = useState({ usuario: '', password: '', rol: 'cliente' });
  const [msg, setMsg] = useState({ type: '', text: '' });

  const fetchUsuarios = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/usuarios');
      const data = await res.json();
      if (data.success) {
        setUsuarios(data.usuarios);
      }
    } catch (err) {
      console.error('Error al cargar usuarios:', err);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUsuario)
      });
      const data = await res.json();
      if (data.success) {
        setMsg({ type: 'success', text: '¡Usuario registrado correctamente!' });
        setShowModal(false);
        setNewUsuario({ usuario: '', password: '', rol: 'cliente' });
        fetchUsuarios();
      } else {
        setMsg({ type: 'danger', text: data.message || 'Error al registrar usuario.' });
      }
    } catch (err) {
      setMsg({ type: 'danger', text: 'Error de conexión con el servidor.' });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este usuario?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/auth/usuarios/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setMsg({ type: 'success', text: 'Usuario eliminado exitosamente.' });
        fetchUsuarios();
      } else {
        setMsg({ type: 'danger', text: 'No se pudo eliminar el usuario.' });
      }
    } catch (err) {
      setMsg({ type: 'danger', text: 'Error de conexión al eliminar.' });
    }
  };

  return (
    <div className="container py-5 mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="serif-title text-warning fw-bold mb-1">🛡️ Panel de Administración CRUD</h2>
          <p className="text-muted small">Gestión y control de cuentas de usuario conectadas a la Base de Datos MySQL.</p>
        </div>
        <Button variant="warning" className="fw-bold" onClick={() => setShowModal(true)}>
          + Registrar Nuevo Usuario
        </Button>
      </div>

      {msg.text && (
        <Alert variant={msg.type} onClose={() => setMsg({ type: '', text: '' })} dismissible>
          {msg.text}
        </Alert>
      )}

      <div className="card shadow border-0 rounded-4 overflow-hidden">
        <Table striped hover responsive className="mb-0 align-middle">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nombre de Usuario</th>
              <th>Rol en el Sistema</th>
              <th className="text-center">Acciones (CRUD)</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.length > 0 ? (
              usuarios.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td className="fw-bold">{u.usuario}</td>
                  <td>
                    <Badge bg={u.rol === 'admin' ? 'danger' : 'primary'}>
                      {u.rol ? u.rol.toUpperCase() : 'CLIENTE'}
                    </Badge>
                  </td>
                  <td className="text-center">
                    <Button 
                      variant="outline-danger" 
                      size="sm" 
                      onClick={() => handleDelete(u.id)}
                      disabled={u.usuario === 'admin'}
                    >
                      Eliminar Registro
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-muted">
                  No hay usuarios registrados en la base de datos.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton className="bg-dark text-white border-bottom border-warning">
          <Modal.Title className="text-warning">➕ Incluir Nuevo Usuario</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleCreate}>
          <Modal.Body className="bg-light">
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Nombre de Usuario:</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Ej: nuevo_usuario"
                required 
                value={newUsuario.usuario} 
                onChange={(e) => setNewUsuario({ ...newUsuario, usuario: e.target.value })} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Contraseña:</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="••••••••"
                required 
                value={newUsuario.password} 
                onChange={(e) => setNewUsuario({ ...newUsuario, password: e.target.value })} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Rol Asignado:</Form.Label>
              <Form.Select 
                value={newUsuario.rol} 
                onChange={(e) => setNewUsuario({ ...newUsuario, rol: e.target.value })}
              >
                <option value="cliente">Cliente</option>
                <option value="admin">Administrador</option>
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="bg-light">
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
            <Button variant="success" type="submit" className="fw-bold">
              Guardar en Base de Datos
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default AdminUsersPanel;