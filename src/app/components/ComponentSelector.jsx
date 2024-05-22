import React, { useState, useEffect } from 'react';

const ComponentSelector = ({ isOpen, onClose, onSave, taskToEdit }) => {
    const [componentType, setComponentType] = useState('');
    const [componentData, setComponentData] = useState({});
    const [menuLinks, setMenuLinks] = useState([{ name: '', url: '' }]);

    useEffect(() => {
        if (taskToEdit) {
            setComponentType(taskToEdit.type);
            setComponentData(taskToEdit.data);
            if (taskToEdit.type === 'Menu') {
                setMenuLinks(taskToEdit.data.links);
            }
        }
    }, [taskToEdit]);

    const handleSave = () => {
        if (componentType === 'Menu') {
            onSave({ type: componentType, data: { links: menuLinks } });
        } else {
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

    const renderFields = () => {
        switch (componentType) {
            case 'Text':
                return (
                    <div>
                        <label>Text Data:</label>
                        <input
                            type="text"
                            value={componentData.text || ''}
                            onChange={(e) => setComponentData({ ...componentData, text: e.target.value })}
                            placeholder="Enter text"
                        />
                    </div>
                );
            case 'Image':
                return (
                    <div>
                        <label>Image URL:</label>
                        <input type="file" onChange={handleFileChange} />
                        <label>Alt Text:</label>
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
                                <label>Link Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={link.name}
                                    onChange={(e) => handleMenuChange(index, e)}
                                    placeholder="Enter link name"
                                />
                                <label>Link URL:</label>
                                <input
                                    type="text"
                                    name="url"
                                    value={link.url}
                                    onChange={(e) => handleMenuChange(index, e)}
                                    placeholder="Enter link URL"
                                />
                            </div>
                        ))}
                        <button type="button" onClick={addMenuLink}>Add Another Link</button>
                    </div>
                );
            default:
                return null;
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>{taskToEdit ? 'Edit Component' : 'Select Component'}</h2>
                <div>
                    <label>Component Type:</label>
                    <select value={componentType} onChange={(e) => setComponentType(e.target.value)}>
                        <option value="">Select...</option>
                        <option value="Text">Text</option>
                        <option value="Image">Image</option>
                        <option value="Menu">Menu</option>
                        {/* Add more component types as needed */}
                    </select>
                </div>
                {renderFields()}
                <button onClick={handleSave}>{taskToEdit ? 'Save Changes' : 'Save'}</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default ComponentSelector;
