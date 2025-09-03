import { jsPDF } from 'jspdf';

export const exportToPDF = ({ tasks, schedule, docs }) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text('ZenLoop Export', 14, 20);

  doc.setFontSize(14);
  doc.text('Tasks:', 14, 40);
  tasks.forEach((task, i) => {
    doc.text(`${i + 1}. ${task.text}`, 20, 50 + i * 10);
  });

  doc.text('Schedule:', 14, 80);
  schedule.forEach((event, i) => {
    doc.text(`${event.event} (${event.start} - ${event.end})`, 20, 90 + i * 10);
  });

  doc.text('Documents:', 14, 120);
  doc.setFontSize(12);
  doc.text(docs, 14, 130);

  doc.save('zenloop-export.pdf');
};
