import { Loader, Save } from "lucide-react";

export const ActionButtons = ({ isEditing, isSaving, onCancel, onSubmit }) => {
  if (!isEditing) return null;

  return (
    <div className="action-buttons">
      <button 
        type="button"
        onClick={onCancel}
        className="btn btn-outline"
        disabled={isSaving}
      >
        Cancelar
      </button>
      <button 
        type="submit"
        className="btn btn-primary"
        disabled={isSaving}
      >
        {isSaving ? (
          <>
            <Loader size={16} className="btn-icon animate-spin" />
            Guardando...
          </>
        ) : (
          <>
            <Save size={16} className="btn-icon" />
            Guardar
          </>
        )}
      </button>
    </div>
  );
};