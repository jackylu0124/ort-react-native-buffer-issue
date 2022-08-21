/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {type PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Alert,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import * as ort from "onnxruntime-react-native";
import { Env, Tensor } from "onnxruntime-react-native";
import { Buffer } from "buffer";

function HexStrToUint8Array(hexStr: string) {
  const arr = new Uint8Array(hexStr.length/2);
  for (let i = 0; i < hexStr.length/2; i++) {
    const current_uint8 = parseInt(hexStr.substring(2*i, 2*i+2), 16);
    arr[i] = current_uint8;
  }
  return arr;
}

async function createAndRunInferenceSessionWithUin8Array() {
  // "onnx_hex_files/LinearBlend_v001.ort" is read with Python in binary mode and its content is then written in hex mode into "onnx_hex_files/LinearBlend_v001.txt", the
  // string below is directly copied from "onnx_hex_files/LinearBlend_v001.txt"
  const linear_blend_model_hex_str = "180000004f52544d0000000000000a0010000c00080004000a0000000c00000080000000440d0000f4f5ffff0c000000040000000000000004f6ffff380000000400000005000000c093771bec3afa9d60b86347fe42de82983cd8cedae17dd9983cd8cedae17dd960b86347fe42de820000000005000000000000000100000002000000030000000400000014002c0020001c00180014001000080000000400140000003c000000ffffffffffffff7f980c00009c0c0000a40c0000f00a00000700000000000000000000001400240020001c001800140010000c000800040014000000400a00007c0a00008c0a0000140000000500000024000000b40300001c0a000005000000e00200000c02000058010000c00000001c00000005000000080300004402000070010000cc0000003400000026feffff040000000c0000000400000000000000020000000200000000000000000000000300000000000000010000001afeffff340000003400000028000000380000003c000000fc02000044020000040000000e000000bc0b00003000000034000000000000000000000002000000010000000100000001000000bc0900000200000040040000a80300000000000000000000050000004164645f35000000c6feffff0300000018000000040000000100000004000000000000000100000000000000aefeffff340000003400000028000000380000003c00000068020000e0000000030000000e000000280b0000300000003400000000000000000000000200000001000000010000000100000020030000020000003c090000440900000000000000000000050000004d756c5f340000005affffff02000000180000000400000001000000040000000000000000000000010000000100000000000000000000004effffff340000003400000028000000380000003c000000c801000040000000020000000e000000880a0000380000003c000000000000000000000002000000010000000100000001000000140300000200000090040000b0080000030000004d756c000000000000000000050000004d756c5f33000a001000040008000c000a000000010000001800000004000000010000000200000000000000000000000100000000000000000000000000000000001e00340030002c002800240020001c0000001800140010000c00080004001e000000340000003400000028000000380000003c000000f800000040000000010000000e000000b8090000380000003c000000000000000000000002000000010000000100000001000000c80300000200000044060000a804000003000000416464000000000000000000050000004164645f32000a000c000000040008000a0000001800000004000000010000000100000000000000000000000000000000001e0030002c0028002400200000001c0000001800140010000c00080004001e000000300000003000000024000000300000003400000038000000500000000d000000fc0800004c00000050000000000000000000000001000000010000000100000094050000010000001407000014000000435055457865637574696f6e50726f766964657200000000030000004e6567000000000000000000050000004e65675f30000000090000005c0500008c040000b403000078030000c0020000fc010000340100009c000000040000009efbffff0800000084000000c6faffff0800000000000001bcfaffff01000000040000000afaffff04000000040000004000000024000000140000000400000026faffff0400000060ffffff32faffff040000006cffffff3efaffff0400000050fbffff00000001030000000000000056faffff0400000050faffff00000001010000000000000000000000010000003700000032fcffff08000000840000005afbffff080000000000000150fbffff01000000040000009efaffff040000000400000044000000280000001400000004000000bafaffff04000000f4ffffffc6faffff080000000400040004000000d6faffff04000000e8fbffff000000010300000000000000eefaffff0400000000fcffff0000000101000000000000000100000036000000c6fcffff0800000064050000eefbffff0800000000000001e4fbffff010000000400000032fbffff0400000004000000780000005c00000030000000040000004efbffff04000000a6fbffff00000002040000000e000000416464626c656e645f64696d5f33000076fbffff04000000cefbffff00000002040000000e000000416464626c656e645f64696d5f3200009efbffff04000000b0fcffff000000010300000000000000b6fbffff04000000b0fbffff000000010100000000000000000000008afdffff08000000b0000000b2fcffff0800000000000001a8fcffff0100000004000000f6fbffff04000000030000006c00000038000000040000000efcffff0400000066fcffff000000020400000014000000616c7068615f64796e616d69635f617865735f32000000003efcffff0400000096fcffff000000020400000014000000616c7068615f64796e616d69635f617865735f31000000006efcffff0400000068fcffff0000000101000000000000000000000001000000350000004afeffff08000000fc03000072fdffff080000000000000168fdffff0100000004000000b6fcffff04000000030000006c0000003800000004000000cefcffff0400000026fdffff000000020400000014000000616c7068615f64796e616d69635f617865735f3200000000fefcffff0400000056fdffff000000020400000014000000616c7068615f64796e616d69635f617865735f31000000002efdffff0400000040feffff000000010100000000000000fefeffff080000002800000026feffff08000000000000011cfeffff01000000040000006afdffff0400000000000000010000003400000036ffffff080000001c0300005efeffff080000000000000154feffff0100000004000000a2fdffff040000000400000080000000640000003400000004000000befdffff0400000016feffff000000020400000013000000696d67325f64796e616d69635f617865735f3200eafdffff0400000042feffff000000020400000013000000696d67325f64796e616d69635f617865735f310016feffff0400000028ffffff0000000103000000000000002efeffff0400000050feffff00000001010000000000000000000a000c000800000004000a00000008000000b400000032ffffff080000000000000128ffffff010000000400000076feffff04000000030000006c00000038000000040000008efeffff04000000e6feffff000000020400000014000000616c7068615f64796e616d69635f617865735f3200000000befeffff0400000016ffffff000000020400000014000000616c7068615f64796e616d69635f617865735f3100000000eefeffff0c0000000800100007000800080000000000000101000000000000000100000033000a000e000800000004000a000000140000008801000000000a000c0000000b0004000a000000100000000000000108000c000400080008000000010000000400000056ffffff0400000004000000a4000000780000003c0000000400000072ffffff04000000caffffff000000020400000013000000696d67315f64796e616d69635f617865735f3200000006000a000400060000001000000000000a000c000700000008000a000000000000020400000013000000696d67315f64796e616d69635f617865735f3100deffffff0c0000000800120007000800080000000000000103000000000000000000060008000400060000000c0000000800140007000800080000000000000101000000000000000000000001000000180000000000000000000e001400100000000c00080004000e00000010000000010000001000000014000000040000000000803f00000000000000000100000034000000010000000400000005000000626c656e640000000300000024000000140000000400000005000000616c70686100000004000000696d67320000000004000000696d67310000000009000000840100005001000024010000f0000000c400000090000000640000003000000004000000d8feffff010000000000000004000000100000006f72672e7079746f7263682e6174656e0000000000ffffff0100000000000000040000001a000000636f6d2e6d6963726f736f66742e6578706572696d656e74616c000000ffffff010000000000000000000000040000000d000000636f6d2e6d6963726f736f667400000058ffffff0100000000000000040000001800000061692e6f6e6e782e707265766965772e747261696e696e670000000088ffffff0100000000000000040000001000000061692e6f6e6e782e747261696e696e670000000080ffffff0100000000000000000000000400000014000000636f6d2e6d732e696e7465726e616c2e6e68776300000000e0ffffff0300000000000000040000000a00000061692e6f6e6e782e6d6c0000080010000c0004000800000001000000000000000400000013000000636f6d2e6d6963726f736f66742e6e63687763000800140010000400080000000e000000000000000000000004000000000000000000000004000000312e313000000000070000007079746f726368000100000034000000";
  const linear_blend_model_uint8_arr = HexStrToUint8Array(linear_blend_model_hex_str);
  // const linear_blend_model_base64 = Buffer.from(linear_blend_model_uint8_arr).toString("base64")
  // console.log(linear_blend_model_base64);
  ort.InferenceSession.create(linear_blend_model_uint8_arr).then(async (linear_blend_session) => { // Notes: linear_blend_model_uint8_buffer.buffer also doesn't work
    console.log("Initializing inference session with Uint8Array succeeded.");
    const img1 = new Tensor("float32", new Float32Array(1 * 3 * 256 * 176).fill(0.2), [1, 3, 256, 176]);
    const img2 = new Tensor("float32", new Float32Array(1 * 3 * 256 * 176).fill(0.7), [1, 3, 256, 176]);
    const alpha = new Tensor("float32", new Float32Array(1 * 256 * 176).fill(0.5), [1, 256, 176]);
    const linear_blend_result = (await linear_blend_session.run({"img1": img1, "img2": img2, "alpha": alpha})).blend;
    console.log("First 10 entries of \"linear_blend_result\":", linear_blend_result.data.slice(0, 10));
  }).catch((e) => {
    console.log("Initializing inference session with Uint8Array failed.");
    console.log(e);
  });
}

async function createAndRunInferenceSessionWithArrayBuffer() {
  // "onnx_hex_files/LinearBlend_v001.ort" is read with Python in binary mode and its content is then written in hex mode into "onnx_hex_files/LinearBlend_v001.txt", the
  // string below is directly copied from "onnx_hex_files/LinearBlend_v001.txt"
  const linear_blend_model_hex_str = "180000004f52544d0000000000000a0010000c00080004000a0000000c00000080000000440d0000f4f5ffff0c000000040000000000000004f6ffff380000000400000005000000c093771bec3afa9d60b86347fe42de82983cd8cedae17dd9983cd8cedae17dd960b86347fe42de820000000005000000000000000100000002000000030000000400000014002c0020001c00180014001000080000000400140000003c000000ffffffffffffff7f980c00009c0c0000a40c0000f00a00000700000000000000000000001400240020001c001800140010000c000800040014000000400a00007c0a00008c0a0000140000000500000024000000b40300001c0a000005000000e00200000c02000058010000c00000001c00000005000000080300004402000070010000cc0000003400000026feffff040000000c0000000400000000000000020000000200000000000000000000000300000000000000010000001afeffff340000003400000028000000380000003c000000fc02000044020000040000000e000000bc0b00003000000034000000000000000000000002000000010000000100000001000000bc0900000200000040040000a80300000000000000000000050000004164645f35000000c6feffff0300000018000000040000000100000004000000000000000100000000000000aefeffff340000003400000028000000380000003c00000068020000e0000000030000000e000000280b0000300000003400000000000000000000000200000001000000010000000100000020030000020000003c090000440900000000000000000000050000004d756c5f340000005affffff02000000180000000400000001000000040000000000000000000000010000000100000000000000000000004effffff340000003400000028000000380000003c000000c801000040000000020000000e000000880a0000380000003c000000000000000000000002000000010000000100000001000000140300000200000090040000b0080000030000004d756c000000000000000000050000004d756c5f33000a001000040008000c000a000000010000001800000004000000010000000200000000000000000000000100000000000000000000000000000000001e00340030002c002800240020001c0000001800140010000c00080004001e000000340000003400000028000000380000003c000000f800000040000000010000000e000000b8090000380000003c000000000000000000000002000000010000000100000001000000c80300000200000044060000a804000003000000416464000000000000000000050000004164645f32000a000c000000040008000a0000001800000004000000010000000100000000000000000000000000000000001e0030002c0028002400200000001c0000001800140010000c00080004001e000000300000003000000024000000300000003400000038000000500000000d000000fc0800004c00000050000000000000000000000001000000010000000100000094050000010000001407000014000000435055457865637574696f6e50726f766964657200000000030000004e6567000000000000000000050000004e65675f30000000090000005c0500008c040000b403000078030000c0020000fc010000340100009c000000040000009efbffff0800000084000000c6faffff0800000000000001bcfaffff01000000040000000afaffff04000000040000004000000024000000140000000400000026faffff0400000060ffffff32faffff040000006cffffff3efaffff0400000050fbffff00000001030000000000000056faffff0400000050faffff00000001010000000000000000000000010000003700000032fcffff08000000840000005afbffff080000000000000150fbffff01000000040000009efaffff040000000400000044000000280000001400000004000000bafaffff04000000f4ffffffc6faffff080000000400040004000000d6faffff04000000e8fbffff000000010300000000000000eefaffff0400000000fcffff0000000101000000000000000100000036000000c6fcffff0800000064050000eefbffff0800000000000001e4fbffff010000000400000032fbffff0400000004000000780000005c00000030000000040000004efbffff04000000a6fbffff00000002040000000e000000416464626c656e645f64696d5f33000076fbffff04000000cefbffff00000002040000000e000000416464626c656e645f64696d5f3200009efbffff04000000b0fcffff000000010300000000000000b6fbffff04000000b0fbffff000000010100000000000000000000008afdffff08000000b0000000b2fcffff0800000000000001a8fcffff0100000004000000f6fbffff04000000030000006c00000038000000040000000efcffff0400000066fcffff000000020400000014000000616c7068615f64796e616d69635f617865735f32000000003efcffff0400000096fcffff000000020400000014000000616c7068615f64796e616d69635f617865735f31000000006efcffff0400000068fcffff0000000101000000000000000000000001000000350000004afeffff08000000fc03000072fdffff080000000000000168fdffff0100000004000000b6fcffff04000000030000006c0000003800000004000000cefcffff0400000026fdffff000000020400000014000000616c7068615f64796e616d69635f617865735f3200000000fefcffff0400000056fdffff000000020400000014000000616c7068615f64796e616d69635f617865735f31000000002efdffff0400000040feffff000000010100000000000000fefeffff080000002800000026feffff08000000000000011cfeffff01000000040000006afdffff0400000000000000010000003400000036ffffff080000001c0300005efeffff080000000000000154feffff0100000004000000a2fdffff040000000400000080000000640000003400000004000000befdffff0400000016feffff000000020400000013000000696d67325f64796e616d69635f617865735f3200eafdffff0400000042feffff000000020400000013000000696d67325f64796e616d69635f617865735f310016feffff0400000028ffffff0000000103000000000000002efeffff0400000050feffff00000001010000000000000000000a000c000800000004000a00000008000000b400000032ffffff080000000000000128ffffff010000000400000076feffff04000000030000006c00000038000000040000008efeffff04000000e6feffff000000020400000014000000616c7068615f64796e616d69635f617865735f3200000000befeffff0400000016ffffff000000020400000014000000616c7068615f64796e616d69635f617865735f3100000000eefeffff0c0000000800100007000800080000000000000101000000000000000100000033000a000e000800000004000a000000140000008801000000000a000c0000000b0004000a000000100000000000000108000c000400080008000000010000000400000056ffffff0400000004000000a4000000780000003c0000000400000072ffffff04000000caffffff000000020400000013000000696d67315f64796e616d69635f617865735f3200000006000a000400060000001000000000000a000c000700000008000a000000000000020400000013000000696d67315f64796e616d69635f617865735f3100deffffff0c0000000800120007000800080000000000000103000000000000000000060008000400060000000c0000000800140007000800080000000000000101000000000000000000000001000000180000000000000000000e001400100000000c00080004000e00000010000000010000001000000014000000040000000000803f00000000000000000100000034000000010000000400000005000000626c656e640000000300000024000000140000000400000005000000616c70686100000004000000696d67320000000004000000696d67310000000009000000840100005001000024010000f0000000c400000090000000640000003000000004000000d8feffff010000000000000004000000100000006f72672e7079746f7263682e6174656e0000000000ffffff0100000000000000040000001a000000636f6d2e6d6963726f736f66742e6578706572696d656e74616c000000ffffff010000000000000000000000040000000d000000636f6d2e6d6963726f736f667400000058ffffff0100000000000000040000001800000061692e6f6e6e782e707265766965772e747261696e696e670000000088ffffff0100000000000000040000001000000061692e6f6e6e782e747261696e696e670000000080ffffff0100000000000000000000000400000014000000636f6d2e6d732e696e7465726e616c2e6e68776300000000e0ffffff0300000000000000040000000a00000061692e6f6e6e782e6d6c0000080010000c0004000800000001000000000000000400000013000000636f6d2e6d6963726f736f66742e6e63687763000800140010000400080000000e000000000000000000000004000000000000000000000004000000312e313000000000070000007079746f726368000100000034000000";
  const linear_blend_model_arr_buffer = HexStrToUint8Array(linear_blend_model_hex_str).buffer;
  // const linear_blend_model_base64 = Buffer.from(linear_blend_model_uint8_arr).toString("base64")
  // console.log(linear_blend_model_base64);
  ort.InferenceSession.create(linear_blend_model_arr_buffer).then(async (linear_blend_session) => { // Notes: linear_blend_model_uint8_buffer.buffer also doesn't work
    console.log("Initializing inference session with ArrayBuffer succeeded.");
    const img1 = new Tensor("float32", new Float32Array(1 * 3 * 256 * 176).fill(0.2), [1, 3, 256, 176]);
    const img2 = new Tensor("float32", new Float32Array(1 * 3 * 256 * 176).fill(0.7), [1, 3, 256, 176]);
    const alpha = new Tensor("float32", new Float32Array(1 * 256 * 176).fill(0.5), [1, 256, 176]);
    const linear_blend_result = (await linear_blend_session.run({"img1": img1, "img2": img2, "alpha": alpha})).blend;
    console.log("First 10 entries of \"linear_blend_result\":", linear_blend_result.data.slice(0, 10));
  }).catch((e) => {
    console.log("Initializing inference session with ArrayBuffer failed.");
    console.log(e);
  });
}

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        
        <View style={{flexDirection: "column", justifyContent: "space-between"}}>
          <Text style={styles.sectionDescription}>Click button below to test creating and running inference session with a Uint8Array</Text>
          <Button title="Create and run inference session with Uint8Array!" onPress={createAndRunInferenceSessionWithUin8Array}></Button>
          <Text style={styles.sectionDescription}>Click button below to test creating and running inference session with an ArrayBuffer</Text>
          <Button title="Create and run inference session with ArrayBuffer!" onPress={createAndRunInferenceSessionWithArrayBuffer}></Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
