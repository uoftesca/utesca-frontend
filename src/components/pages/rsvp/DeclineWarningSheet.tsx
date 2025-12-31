import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Loader2 } from 'lucide-react';

interface DeclineWarningSheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    eventTitle: string;
    loading: boolean;
}

export function DeclineWarningSheet({
    open,
    onOpenChange,
    onConfirm,
    eventTitle,
    loading,
}: DeclineWarningSheetProps) {
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle className="flex items-center gap-2 text-destructive">
                        <AlertTriangle className="h-5 w-5" />
                        Decline Attendance?
                    </SheetTitle>
                </SheetHeader>
                <div className="space-y-3 pt-4">
                    <p className="text-sm text-muted-foreground">
                        Are you sure you want to decline attendance for{' '}
                        <strong>{eventTitle}</strong>?
                    </p>
                    <p className="text-sm text-destructive font-medium">
                        This action is final and cannot be reversed.
                    </p>
                    <p className="text-sm text-muted-foreground">
                        If you need to attend after declining, you must contact the
                        organizers at uoft.esca@gmail.com.
                    </p>
                </div>
                <SheetFooter className="mt-6 flex gap-3">
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={loading}
                        className="flex-1"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={onConfirm}
                        disabled={loading}
                        className="flex-1"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Declining...
                            </>
                        ) : (
                            'Yes, Decline'
                        )}
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
