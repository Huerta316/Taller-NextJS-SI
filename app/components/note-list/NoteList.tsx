import { NoteData } from "../../types/Note";
import NoteCard from "../note-card/NoteCard";

interface NoteListProps {
    notes: NoteData[];
    onUpdateNote: (updatedNote: NoteData) => Promise<void>;
    onDeleteNote: (noteId: number) => void;
}

const NoteList = ({ notes, onUpdateNote, onDeleteNote }: NoteListProps) => {
    return (
        <div className="flex flex-wrap p-6 gap-6 bg-gray-100 rounded-lg shadow-lg max-h-screen overflow-y-auto">
            {notes.map((note) => (
                <NoteCard
                    key={note.id}
                    note={note}
                    onUpdateNote={onUpdateNote}
                    onDeleteNote={onDeleteNote}
                />
            ))}
        </div>
    );
};

export default NoteList;
