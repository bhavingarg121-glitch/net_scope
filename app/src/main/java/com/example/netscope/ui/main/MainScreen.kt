package com.example.netscope.ui.main

import androidx.compose.foundation.layout.Column
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable

@Composable
fun MainScreen(data: List<String>) {
    Column {
        data.forEach { item ->
            Text(text = "Hello $item!")
        }
    }
}
