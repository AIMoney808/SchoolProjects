package murach.ui;

import java.awt.*;
import java.awt.Insets;
import javax.swing.*;
import javax.swing.UIManager;
import javax.swing.UnsupportedLookAndFeelException;

public class AreaAndPerimeterFrame extends JFrame {

    // TODO: Add instance variables for text fields
    private JTextField lenghtField; 
    private JTextField widthField; 
    private JTextField areaField; 
    private JTextField perimeterField;
    
    public AreaAndPerimeterFrame() {
        try {
            UIManager.setLookAndFeel(
                    UIManager.getSystemLookAndFeelClassName());
        } catch (ClassNotFoundException | InstantiationException |
                 IllegalAccessException | UnsupportedLookAndFeelException e) {
            System.out.println(e);
        }
        initComponents();
    }

    private void initComponents() {
        setTitle("Area and Perimeter Calculator");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationByPlatform(true);
        
        // components go here
        lenghtField = new JTextField(); 
        widthField = new JTextField(); 
        areaField = new JTextField(); 
        perimeterField = new JTextField();
        
        areaField.setEditable(false);
        perimeterField.setEditable(false);
        
        Dimension dim = new Dimension(320, 24); 
        lenghtField.setPreferredSize(dim); 
        widthField.setPreferredSize(dim); 
        areaField.setPreferredSize(dim); 
        perimeterField.setPreferredSize(dim); 
        lenghtField.setMinimumSize(dim); 
        widthField.setMinimumSize(dim); 
        areaField.setMinimumSize(dim); 
        perimeterField.setMinimumSize(dim);
        
        JButton computeButton = new JButton("Compute"); 
        JButton resetButton = new JButton("Reset"); 
 
        computeButton.addActionListener( 
            e -> computeButtonClicked()); 
        resetButton.addActionListener( 
            e -> resetButtonClicked()); 
 
        // button panel 
        JPanel buttonPanel = new JPanel(); 
        buttonPanel.setLayout( 
            new FlowLayout(FlowLayout.RIGHT)); 
        buttonPanel.add(computeButton); 
        buttonPanel.add(resetButton);         
 
        // main panel 
        JPanel panel = new JPanel(); 
        panel.setLayout(new GridBagLayout()); 
        panel.add(new JLabel( 
            "Length:"), getConstraints(0, 0));
        panel.add(lenghtField, getConstraints(1, 0)); 
        panel.add(new JLabel("Width:"), 
            getConstraints(0, 1)); 
        panel.add(widthField, getConstraints(1, 1)); 
        panel.add(new JLabel("Area:"), getConstraints(0, 
            2)); 
        panel.add(areaField, getConstraints(1, 2)); 
        panel.add(new JLabel("Perimeter:"), 
            getConstraints(0, 3)); 
        panel.add(perimeterField, getConstraints(1, 3));         
 
        add(panel, BorderLayout.CENTER); 
        add(buttonPanel, BorderLayout.SOUTH); 
         
        setSize(new Dimension(420, 200));
        setVisible(true);
    }

    // Helper method to return GridBagConstraints objects
    private GridBagConstraints getConstraints(int x, int y) {
        GridBagConstraints c = new GridBagConstraints();
        c.anchor = GridBagConstraints.LINE_START;
        c.insets = new Insets(5, 5, 0, 5);
        c.gridx = x;
        c.gridy = y;
        return c;
    }

    private void computeButtonClicked() {
        // TODO: Implement code
        double length = Double.parseDouble( 
            lenghtField.getText()); 
        double width = Double.parseDouble( 
            widthField.getText());
        
        double area = width * length;
        areaField.setText(String.format("%.3f",area));
        double perimeter = 2 * width + 2 * length;
        perimeterField.setText(String.format("%.3f",perimeter));
    }

    private void resetButtonClicked() {
        // TODO: Implement code
        lenghtField.setText("");
        widthField.setText("");
        areaField.setText("");
        perimeterField.setText("");
    }
    
    public static void main(String[] args) {
        java.awt.EventQueue.invokeLater(() -> {
            JFrame frame = new AreaAndPerimeterFrame();
        });        
    }
}