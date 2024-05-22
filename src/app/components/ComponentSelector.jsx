import React, { useState, useEffect } from 'react';

const ComponentSelector = ({ isOpen, onClose, onSave, taskToEdit }) => {
    const [componentType, setComponentType] = useState('');
    const [componentData, setComponentData] = useState({});
    const [menuLinks, setMenuLinks] = useState([{ name: '', url: '' }]);
    const [quickAccessItems, setQuickAccessItems] = useState([{ title: '', link: '' }]);

    useEffect(() => {
        if (taskToEdit) {
            setComponentType(taskToEdit.type);
            setComponentData(taskToEdit.data);
            if (taskToEdit.type === 'Menu') {
                setMenuLinks(taskToEdit.data.links);
            } else if(taskToEdit.type === 'Bloques') {
                setQuickAccessItems(taskToEdit.data.items);
            }
        }
    }, [taskToEdit]);

    const handleSave = () => {
        if (componentType === 'Menu') {
            onSave({ type: componentType, data: { links: menuLinks } });
        } else if (componentType === 'Bloques') {
            onSave({ type: componentType, data: { items: quickAccessItems } });
        } else{
            onSave({ type: componentType, data: componentData });
        }
        onClose();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setComponentData({ ...componentData, url: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleMenuChange = (index, e) => {
        const { name, value } = e.target;
        const updatedLinks = menuLinks.map((link, i) => i === index ? { ...link, [name]: value } : link);
        setMenuLinks(updatedLinks);
    };

    const addMenuLink = () => {
        setMenuLinks([...menuLinks, { name: '', url: '' }]);
    };

    const handleQuickAccessChange = (index, e) => {
        const { name, value } = e.target;
        const updatedItems = quickAccessItems.map((item, i) => i === index ? { ...item, [name]: value } : item);
        setQuickAccessItems(updatedItems);
    };

    const addQuickAccessItem = () => {
        setQuickAccessItems([...quickAccessItems, { title: '', link: '' }]);
    };

    const renderFields = () => {
        switch (componentType) {
            case 'Text':
                return (
                    <div>
                        <label>Texto a mostrar:</label>
                        <input
                            type="text"
                            value={componentData.text || ''}
                            onChange={(e) => setComponentData({ ...componentData, text: e.target.value })}
                            placeholder="Agregar texto"
                        />
                    </div>
                );
            case 'Image':
                return (
                    <div>
                        <label>URL de la imagen:</label>
                        <input type="file" onChange={handleFileChange} />
                        <label>Alt de la imagen:</label>
                        <input
                            type="text"
                            value={componentData.alt || ''}
                            onChange={(e) => setComponentData({ ...componentData, alt: e.target.value })}
                            placeholder="Enter alt text"
                        />
                    </div>
                );
            case 'Menu':
                return (
                    <div>
                        <h3>Menu Links</h3>
                        {menuLinks.map((link, index) => (
                            <div key={index}>
                                <label>Nombre del enlace:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={link.name}
                                    onChange={(e) => handleMenuChange(index, e)}
                                    placeholder="Nombre del enlace"
                                />
                                <label>URL del enlace:</label>
                                <input
                                    type="text"
                                    name="url"
                                    value={link.url}
                                    onChange={(e) => handleMenuChange(index, e)}
                                    placeholder="URL del enlace"
                                />
                            </div>
                        ))}
                        <button type="button" onClick={addMenuLink}>Agregar otro enlace</button>
                    </div>
                );
            case 'Introduccion':
                return (
                    <div>
                        <label>Titulo:</label>
                        <input
                            type="text"
                            value={componentData.title || ''}
                            onChange={(e) => setComponentData({ ...componentData, title: e.target.value })}
                            placeholder="Enter title"
                        />
                        <label>Imagen:</label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                        />
                        <label>Texto:</label>
                        <textarea
                            value={componentData.text || ''}
                            onChange={(e) => setComponentData({ ...componentData, text: e.target.value })}
                            placeholder="Enter text"
                        />
                    </div>
                )
            case 'Bloques':
                return (
                    <div>
                        <h3>Quick Access Items</h3>
                        {quickAccessItems.map((item, index) => (
                            <div key={index}>
                                <label>Item Title:</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={item.title}
                                    onChange={(e) => handleQuickAccessChange(index, e)}
                                    placeholder="Enter item title"
                                />
                                <label>Item Link:</label>
                                <input
                                    type="text"
                                    name="link"
                                    value={item.link}
                                    onChange={(e) => handleQuickAccessChange(index, e)}
                                    placeholder="Enter item link"
                                />
                            </div>
                        ))}
                        <button type="button" onClick={addQuickAccessItem}>Agregar otro bloque</button>
                    </div>
                )
            default:
                return null;
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>{taskToEdit ? 'Editar componente' : 'Seleccionar componente'}</h2>
                <div>
                    <label>Tipo de componente:</label>
                    <select value={componentType} onChange={(e) => setComponentType(e.target.value)}>
                        <option value="">Seleccionar...</option>
                        <option value="Text">Text</option>
                        <option value="Image">Image</option>
                        <option value="Menu">Menu</option>
                        <option value="Introduccion">Introduccion</option>
                        <option value="Bloques">Bloques</option>
                        {/* Add more component types as needed */}
                    </select>
                </div>
                {renderFields()}
                <button onClick={handleSave}>{taskToEdit ? 'Guardar Cambios' : 'Guardar'}</button>
                <button onClick={onClose}>Cancelar</button>
            </div>
        </div>
    );
};

export default ComponentSelector;
