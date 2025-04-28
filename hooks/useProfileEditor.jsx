import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const useProfileEditor = (initialState, onSaveCallback) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [state, setState] = useState(initialState);
    const [hasChanges, setHasChanges] = useState(false);

    useEffect(() => {
        if (id && initialState) {
            setState(initialState);
        }
    }, [id, initialState]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState((prev) => ({ ...prev, [name]: value }));
        setHasChanges(true);
    };

    const handleSave = () => {
        if (onSaveCallback) {
            onSaveCallback(state);
        }
        setHasChanges(false);
    };

    const handleCancel = () => {
        setState(initialState);
        setHasChanges(false);
    };

    const handleNavigateBack = (path) => {
        navigate(path || '/');
    };

    return {
        state,
        hasChanges,
        handleInputChange,
        handleSave,
        handleCancel,
        handleNavigateBack,
    };
};

export default useProfileEditor;