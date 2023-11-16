import { FC, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
interface PopupProps {
  onConfirm: () => void;
  children?: React.ReactNode;
}

const backdrop = {
    visible: {
      opacity: 1,
    },
    hidden: {
      opacity: 0,
    },
  };
  
  const content = {
    hidden: {
      opacity: 0,
      y: -200,
    },
    visible: {
      y: 0,
      opacity: 1,
      originY: 0,
      transition: {
        delay: 0.5,
      },
    },
  };
  

const Popup: FC<PopupProps> = ({ onConfirm, children }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onConfirm();
    }
  };

  useEffect(() => {
    window.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onConfirm]);

  const modalOverlayStyle = 'fixed top-0 left-0 w-full h-full bg-opacity-50 bg-black flex justify-center items-center z-50 overflow-auto py-5'
  const modalContentStyle = 'rounded-md'
  
  return (
    <div>
      <motion.div className={modalOverlayStyle} variants={backdrop} exit='hidden' animate='visible' initial='hidden'>
        <motion.div
         variants={content} className={modalContentStyle} ref={modalRef}>
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
};



export default Popup