import { Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle } from '@/components/elements/Dialog'
import { Button } from '@/components/elements/Button'

export interface DialogFormProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description: string;
    children: React.ReactNode;
    onConfirm: () => void;
    confirmText?: string;
    cancelText?: string;
    confirmDisabled?: boolean;
    isAdding?: boolean;
}

export const DialogForm: React.FC<DialogFormProps> = ({
    isOpen,
    onClose,
    title,
    description,
    children,
    onConfirm,
    confirmText,
    cancelText,
    confirmDisabled,
    isAdding
}) => {
    const handleCloseClick = () => {
        onClose();
    };

    return (
        <>
            <Dialog open={isOpen} onClose={handleCloseClick}>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>
                <DialogBody>{children}</DialogBody>
                <DialogActions>
                    <Button plain onClick={handleCloseClick}>
                        {cancelText || 'Cancel'}
                    </Button>
                    <Button onClick={onConfirm} disabled={confirmDisabled || isAdding}>
                        {confirmText || 'Confirm'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
