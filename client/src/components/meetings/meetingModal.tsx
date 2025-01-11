import { Button } from '@chakra-ui/react';
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogBackdrop,
} from '../ui/dialog';
import { ReactNode } from 'react';

type MeetingModalProps = {
  isOpen: boolean; // Pass the icon directly as a React element
  title: string;
  buttonText: string;
  onClose?: () => void;
  onClick?: () => void;
  children?: ReactNode;
};

const MeetingModal = ({
  isOpen,
  title,
  buttonText,
  onClick,
  onClose,
  children,
}: MeetingModalProps) => {
  return (
    <DialogRoot open={isOpen} onOpenChange={onClose} placement="center">
      <DialogBackdrop backdropFilter="blur(3px)" />
      <DialogContent bg="#191818" gap={4}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogBody>{children && children}</DialogBody>
        <DialogFooter>
          <Button
            onClick={onClick}
            color={'#fff'}
            width="100%"
            backgroundColor="#106107"
            _hover={{
              border: 'none',
            }}
          >
            {buttonText}
          </Button>
        </DialogFooter>
        <DialogCloseTrigger
          color={'#fff'}
          _hover={{
            borderColor: 'gray.500',
          }}
        />
      </DialogContent>
    </DialogRoot>
  );
};

export default MeetingModal;
