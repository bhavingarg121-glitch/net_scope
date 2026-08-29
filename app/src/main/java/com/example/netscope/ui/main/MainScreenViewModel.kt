package com.example.netscope.ui.main

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.netscope.data.DataRepository
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.stateIn

class MainScreenViewModel(repository: DataRepository) : ViewModel() {
    val uiState: StateFlow<MainScreenUiState> = repository.data
        .map { MainScreenUiState.Success(it) }
        .stateIn(
            scope = viewModelScope,
            started = SharingStarted.WhileSubscribed(5000),
            initialValue = MainScreenUiState.Loading
        )
}

sealed interface MainScreenUiState {
    object Loading : MainScreenUiState
    data class Success(val data: List<String>) : MainScreenUiState
    data class Error(val message: String) : MainScreenUiState
}
