import { Dialog, DialogContent } from '@/components/ui/dialog';

interface ResumeViewerProps {
  open: boolean;
  onClose: () => void;
}

export default function ResumeViewer({ open, onClose }: ResumeViewerProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh]">
        <iframe
          src="./docs/Resume_VP_MIS AB.pdf"
          className="w-full h-full"
          title="Resume"
        />
      </DialogContent>
    </Dialog>
  );
}
