import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Button } from 'react-native';
import mangHinhMayTinhStyles from '../styles/mangHinhMayTinhStyles';

const Calculator = () => {
    // phần khai báo cho máy tính
    const [pressedNumber, setPressedNumber] = useState("");
    const [result, setResult] = useState("");
    const [fun, setcalculateEquation] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [a, setA] = useState("");
    const [b, setB] = useState("");
    const [c, setC] = useState("");
    const [equationType, setEquationType] = useState(""); // "LE", "QE", or ""
    const [calculatorState, setCalculatorState] = useState("input"); // "input", "result", or "error"
    // Đối tượng ánh xạ giữa dấu "*" và dấu "×"
    const operatorMapping = {
        "*": "×",
        "/": "÷",
    };
    
    const handleCellPress = (value) => {
        const LE_QE = 0;
        if (calculatorState === "result" && value !== "AC") {
            // Reset máy tính nếu đã có kết quả và không nhấn "Nor"
            setPressedNumber("");
            setResult("");
            setCalculatorState("input");
        }
        if (value === "=") {
            try {
                // Thay thế dấu "×" và "÷" thành "*" và "/"
                const cleanedExpression = pressedNumber.replace(/×/g, "*").replace(/÷/g, "/");

                // Kiểm tra nếu có nhiều dấu toán học liên tiếp mà không có số sau
                if (/[+\-*/]$/.test(cleanedExpression)) {
                    throw new Error("Lỗi");
                }
                const calculatedResult = eval(cleanedExpression);

                // Thay thế kết quả trở lại dấu "×" và "÷" trên giao diện người dùng
                const displayedResult = calculatedResult.toString().replace("*", "×").replace("/", "÷");

                setResult(`Kết quả = ${displayedResult}`);
                // setPressedNumber(displayedResult);
                setCalculatorState("result");
            } catch (error) {
                setResult("Lỗi");
                setPressedNumber("");
                setCalculatorState("error");
            }
        } else if (value === "LE" || value === "QE") {
            if (value === "QE") {
                setcalculateEquation("ax^2 + bx + c = 0");
            }
            else {
                setcalculateEquation("ax + b = 0");
            }
            setEquationType(value);
            setModalVisible(true);
        } else if (value === "AC") {
            setcalculateEquation("");
            setPressedNumber("");
            setResult("");
            setCalculatorState("input");
        } else {
            // Kiểm tra nếu có nhiều dấu "." liên tiếp
            if (value === "." && pressedNumber.endsWith(".")) {
                return;
            }
            // Kiểm tra nếu có nhiều dấu toán học liên tiếp
            if (/[+\-*/]$/.test(value) && /[+\-*/]$/.test(pressedNumber)) {
                return;
            }
            // Sử dụng ánh xạ để hiển thị dấu "×"
            const displayedValue = operatorMapping[value] || value;
            setPressedNumber((prevNumber) => prevNumber + displayedValue);
            setCalculatorState("input");
        }
    };
    const renderCell = (value) => (
        <TouchableOpacity
            style={mangHinhMayTinhStyles.cell}
            onPress={() => handleCellPress(value === 'π' ? '3.14' : value)}
        >
            <Text style={mangHinhMayTinhStyles.cellText}>{value === '*' ? '×' : value === '/' ? '÷' : value}</Text>
        </TouchableOpacity>
    );
    const calculateEquation = () => {
        if (equationType === "LE") {
            // Tính phương trình bậc 1
            // Phương trình bậc nhất: "LE" (Linear Equation).
            const x = - b / a;
            setResult(`Phương trình bậc 1: 
            x = ${x}`);
            setCalculatorState("result");
        } else if (equationType === "QE") {
            // Tính phương trình bậc 2
            // Phương trình bậc hai: "QE" (Quadratic Equation).
            const discriminant = b * b - 4 * a * c;
            if (discriminant < 0) {
                setResult("Phương trình vô nghiệm");
                setCalculatorState("error");
            } else if (discriminant === 0) {
                const x = -b / (2 * a);
                setResult(`Phương trình có nghiệm kép: x = ${x}`);
                setCalculatorState("result");
            } else {
                const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
                const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
                setResult(`Phương trình có hai nghiệm: x1 = ${x1}, x2 = ${x2}`);
                setCalculatorState("result");
            }
        }
        setModalVisible(false);
    };

    return (
        <View style={mangHinhMayTinhStyles.view_may_tinh}>
            <View style={mangHinhMayTinhStyles.resultView}>
                <Text style={mangHinhMayTinhStyles.result}>{fun}</Text>
            </View>
            <View style={mangHinhMayTinhStyles.resultView}>
                <Text style={mangHinhMayTinhStyles.result}>{pressedNumber}</Text>
            </View>
            <View style={mangHinhMayTinhStyles.resultView2}>
                <Text style={mangHinhMayTinhStyles.result}>{result}</Text>
            </View>
            <View style={mangHinhMayTinhStyles.keyboard}>
                <View style={mangHinhMayTinhStyles.row}>
                    {renderCell("LE")}
                    {renderCell("QE")}
                    {renderCell("AC")}
                    {renderCell("+")}
                </View>
                <View style={mangHinhMayTinhStyles.row}>
                    {renderCell("7")}
                    {renderCell("8")}
                    {renderCell("9")}
                    {renderCell("-")}
                </View>
                <View style={mangHinhMayTinhStyles.row}>
                    {renderCell("4")}
                    {renderCell("5")}
                    {renderCell("6")}
                    {renderCell("*")}
                </View>
                <View style={mangHinhMayTinhStyles.row}>
                    {renderCell("1")}
                    {renderCell("2")}
                    {renderCell("3")}
                    {renderCell("/")}
                </View>
                <View style={mangHinhMayTinhStyles.row}>
                    {renderCell("0")}
                    {renderCell(".")}
                    {renderCell("π")}
                    {renderCell("=")}
                </View>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={mangHinhMayTinhStyles.modalContainer}>
                    <Text style={mangHinhMayTinhStyles.modalTitle}>
                        {equationType === "LE" ? "Phương trình bậc 1" : "Phương trình bậc 2"}
                    </Text>
                    <TextInput
                        style={mangHinhMayTinhStyles.input}
                        placeholder="Nhập a"
                        keyboardType="numeric"
                        onChangeText={(text) => setA(Number(text))}
                    />
                    <TextInput
                        style={mangHinhMayTinhStyles.input}
                        placeholder="Nhập b"
                        keyboardType="numeric"
                        onChangeText={(text) => setB(Number(text))}
                    />
                    {equationType === "QE" && (
                        <TextInput
                            style={mangHinhMayTinhStyles.input}
                            placeholder="Nhập c"
                            keyboardType="numeric"
                            onChangeText={(text) => setC(Number(text))}
                        />
                    )}
                    <Button title="Tính toán" onPress={calculateEquation} />
                    <Button title="Đóng" onPress={() => setModalVisible(false)} />
                </View>
            </Modal>

        </View>
    );
};

export default Calculator;