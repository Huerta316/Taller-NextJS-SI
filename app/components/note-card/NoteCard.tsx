"use client";
import { useState, useRef, useEffect } from "react";
import { NoteData } from "../../types/Note";

interface NoteCardProps {
    note: NoteData;
    onUpdateNote: (updatedNote: NoteData) => void;
    onDeleteNote: (noteId: number) => void;
}

const NoteCard = ({ note, onUpdateNote, onDeleteNote }: NoteCardProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(note.title);
    const [editContent, setEditContent] = useState(note.content);
    const [editCategory, setEditCategory] = useState(note.category);

    const cardRef = useRef<HTMLDivElement | null>(null);

    function toggleExpand() {
        setIsExpanded(!isExpanded);
    }

    function handleEditClick() {
        setIsEditing(!isEditing);
    }

    function handleSaveClick() {
        setIsEditing(false);
        onUpdateNote({
            ...note,
            title: editTitle,
            content: editContent,
            category: editCategory,
        });
    }

    useEffect(() => {
        if (isExpanded && cardRef.current) {
            cardRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    }, [isExpanded]);

    return (
        <div
            {...(isEditing ? {} : { onClick: toggleExpand })}
            ref={cardRef}
            className={`p-4 rounded-lg shadow-md mb-4 space-y-2 transition-all duration-300 ${
                isExpanded || note.isCreating
                    ? "bg-blue-100 border-2 border-blue-300 max-w-full min-w-96 min-h-72"
                    : "bg-white border border-gray-300 max-w-72 min-w-72"
            }`}
        >
            <div className="flex flex-row items-center space-x-2">
                <div
                    className={`rounded-full p-[6px] animate-pulse ${
                        note.category === 1
                            ? "bg-green-400"
                            : note.category === 2
                            ? "bg-orange-400"
                            : "bg-blue-400"
                    }`}
                ></div>
                {isEditing || note.isCreating ? (
                    <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        placeholder="Título de la nota"
                        className="text-xl font-semibold text-gray-700 truncate w-full p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                ) : (
                    <h2 className="text-xl font-semibold text-gray-800 truncate">{note.title}</h2>
                )}
            </div>
            <div className="max-h-60 min-h-40 text-ellipsis">
                {isEditing || note.isCreating ? (
                    <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="w-full p-2 border border-blue-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                        rows={4}
                        placeholder="Escribe tu nota aquí..."
                    />
                ) : (
                    <p className="text-gray-600 text-wrap line-clamp-[6] text-justify">{note.content}</p>
                )}
            </div>
            {isEditing || note.isCreating ? (
                <div className="w-full flex flex-col space-y-2">
                    <select
                        value={editCategory}
                        onChange={(e) => setEditCategory(Number(e.target.value))}
                        className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value={1}>Ideas</option>
                        <option value={2}>Por hacer</option>
                        <option value={3}>Terminado</option>
                    </select>
                </div>
            ) : (
                ""
            )}
            <div className="w-full flex justify-end items-center space-x-2">
                <button
                    onClick={() => onDeleteNote(note.id)}
                    className={`border border-red-500 text-red-500 hover:bg-red-500 hover:text-white p-2 rounded transition-all duration-300 ${
                        isEditing || note.isCreating ? "hidden" : ""
                    }`}
                >
                    Eliminar
                </button>
                {isEditing || note.isCreating ? (
                    <div className="flex flex-row space-x-4">
                        <button
                            onClick={() => setIsEditing(false)}
                            className="text-red-600 border border-red-600 hover:bg-red-600 hover:text-white p-2 rounded transition-all duration-300"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleSaveClick}
                            className="text-white bg-green-400 hover:bg-green-500 p-2 rounded transition-all duration-300"
                        >
                            Guardar
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={handleEditClick}
                        className="text-white bg-orange-300 hover:bg-orange-400 p-2 rounded transition-all duration-300"
                    >
                        Editar
                    </button>
                )}
            </div>
        </div>
    );
};

export default NoteCard;
